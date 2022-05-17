import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { appDataSource } from '../data-source';
import { Positions, Token, Users } from '../entity';
import { ErrorHandler } from '../error';
import { fileService, userService } from '../services';

class UserController {
    async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, count } = req.query;

            const originalURL = req.get('Referrer') as string;

            const data = await userService.getUserPagination(originalURL, Number(page), Number(count));

            res.json(data);
        } catch (e: any) {
            next(e);
        }
    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const filePath = await fileService.saveFile(req.files?.photo as UploadedFile);

            const userToSave = { ...req.body, photo: filePath };

            const { identifiers } = await appDataSource.createQueryBuilder()
                .insert()
                .into(Users)
                .values([userToSave])
                .execute();


            // delete Token from DB after registration
            const token = req.get('Token');

            await appDataSource.createQueryBuilder()
                .delete()
                .from(Token)
                .where('accessToken = :token', { token })
                .execute();

            res.json({
                success: true,
                user_id: identifiers[0].id,
                message: 'New user successfully registered',
            });
        } catch (e: any) {
            next(e);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!Number(id)) {
                next(new ErrorHandler('Validation failed', false, 400,
                        {
                            user_id: [
                                'The user_id must be an integer.',
                            ]
                        }
                    )
                );
                return;
            }

            const [user] = await appDataSource.createQueryBuilder(Users, 'u')
                .leftJoinAndSelect(Positions, 'p', 'p.id = u.positionId')
                .where('u.id = :id', { id })
                .select('u.id', 'id')
                .addSelect('u.name', 'name')
                .addSelect('u.email', 'email')
                .addSelect('u.phone', 'phone')
                .addSelect('p.name', 'position')
                .addSelect('u.positionId', 'position_id')
                .addSelect('u.photo', 'photo')
                .getRawMany();

            if (!user) {
                next(new ErrorHandler('The user with the requested identifier does not exist', false,
                    400,
                    {
                        user_id: [
                            'User not found',
                        ],
                    },
                ));
                return;
            }

            res.json({
                success: true,
                user,
            });
        } catch (e: any) {
            next(e);
        }
    }
}

export const userController = new UserController();

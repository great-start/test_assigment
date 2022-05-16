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

            const data = await userService.getUserPagination(Number(page), Number(count));

            res.json(data);
        } catch (e: any) {
            next(new ErrorHandler(e.message));
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
            next(new ErrorHandler(e.message));
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // const [user] = await appDataSource.getRepository(Users)
            //     .query(`SELECT * FROM users JOIN positions ON users.position_id = positions.id WHERE users.id = $1;`, [id]);

            // const user = await appDataSource.getRepository(Users).createQueryBuilder('user')
            //     // .select()
            //     // .from(Users, 'user')
            //     .leftJoinAndSelect(Positions, 'position', 'position.id = user.position_id')
            //     .where('user.id = :id', { id })
            //     .getOne();

            // const user = await appDataSource.getRepository(Users).createQueryBuilder('user')
            //     .select(
            //     ['user.id', 'user.name', 'user.email', 'user.phone', 'user.position_id', 'position.name'])
            //     .leftJoin('user.position_id', 'position')
            //     .where('user.id = :id', { id })
            //
            //     // .from(Users, 'user')
            //     .getOne();

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
                const fails = {
                    user_id: [
                        'The user_id must be an integer.',
                    ],
                };
                next(new ErrorHandler(
                    'The user with the requested identifier does not exist',
                    false,
                    400,
                    fails,
                ));
                return;
            }

            res.json({
                success: true,
                user,
            });
        } catch (e: any) {
            next(new ErrorHandler(e.message));
        }
    }
}

export const userController = new UserController();

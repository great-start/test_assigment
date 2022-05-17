
import { Users } from '../entity';
import { appDataSource } from '../data-source';
import { ErrorHandler } from '../error';

const userRepository = appDataSource.getRepository(Users);

class UserService {
    public async getUserPagination(originalUrl: string, page: number = 1, perPage: number = 6) {

        if (page < 1) {
            throw new ErrorHandler('Validation failed', false, 422, {
                page: [
                    "The page must be at least 1."
                ]
            });
        }

        const [users, count] = await userRepository.findAndCount({
            skip: perPage * (page - 1),
            take: perPage,
        });

        if (!users.length) {
            throw new ErrorHandler('Page not found', false, 404);
        }

        const total_pages = Math.ceil(count / perPage);

        let next_url = `${originalUrl}?page=${page + 1}&count=${perPage}`;
        let prev_url = null;

        if (total_pages === page) {
            // @ts-ignore
            next_url = null;
        }

        if (total_pages !== 0) {
            prev_url = `${originalUrl}?page=${page - 1}&count=${perPage}`;
        }

        if (page === 1) {
            prev_url = null;
        }

        return {
            success: true,
            page,
            total_pages,
            total_users: count,
            links: {
                next_url,
                prev_url,
            },
            users,
        };
    }
}

export const userService = new UserService();

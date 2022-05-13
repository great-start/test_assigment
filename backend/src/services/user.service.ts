import { Users } from '../entity';
import { appDataSource } from '../data-source';
import { ErrorHandler } from '../error';

const userRepository = appDataSource.getRepository(Users);

class UserService {
    public async getUserPagination(page = 1, perPage = 5) {
        try {
            const [users, count] = await userRepository.findAndCount({
                skip: perPage * (page - 1),
                take: perPage,
            });

            // eslint-disable-next-line camelcase
            const total_pages = Math.ceil(count / perPage);

            let next_url = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page + 1}&count=${count}`;
            let prev_url = null;

            if (total_pages === page) {
                // @ts-ignore
                next_url = null;
            }

            if (total_pages !== 0) {
                prev_url = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page - 1}&count=${count}`;
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
        } catch (e: any) {
            return new ErrorHandler(e.message);
        }
    }
}

export const userService = new UserService();

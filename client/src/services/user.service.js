import {axiosService} from './axios.service';
import {urls} from '../constants';

const userService = {
    getToken: () => axiosService.get(urls.tokens),
    create: (token, user) => axiosService.post(urls.users, user,{ headers: {
            "Content-Type": "multipart/form-data",
            Token: token,
        }}),
    getById: (id) => axiosService.get(`${urls.users}/${id}`),
    positions: () => axiosService.get(urls.positions),
};

export {
    userService
}
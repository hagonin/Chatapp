import request from "./request";

export const authService = {
    register: (data: {}) => request.request({
        method: 'POST',
        url: 'users/register/',
        data

    }),
    login: (data: {}) => request.request({
        method: 'POST',
        url: 'users/login/',
        data

    }),
    getMe: () => request.request({
        method: 'GET',
        url: 'users/profile',
    }),

}
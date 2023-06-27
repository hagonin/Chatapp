import axios from "axios";

// handle token ...

const request = axios.create({
    baseURL: 'https://talkie-api.up.railway.app/api/',
    timeout: 5000,
    headers: { "Content-Type": "application/json" }
});


request.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default request
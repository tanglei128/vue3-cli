import Axios from "axios";

const service = Axios.create({
    // baseURL: "/",
    // timeout: 5000,
    // headers: {
    //     "Content-Type": "application/json",
    // },
    withCredentials: true,
});

let hasHandledUnauthorized = false;
let hasHandled500 = false;

const whiteList = ["/login"];
service.interceptors.request.use(
    (config) => {
        // if (!whiteList.indexOf(config.url) !== -1) {
        //     const token = localStorage.getItem("token");
        //     if (token) {
        //         config.headers["auth_token"] = token;
        //     }
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        const { data, config } = response;
        const { code, msg } = data;
        // if (code === 200 || code === '200') {
        //     return data;
        // }
        // return Promise.reject(response);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default service;
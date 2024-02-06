import axios from "axios";

export const $api = axios.create({
    baseURL: "http://localhost:4000",
});


$api.interceptors.request.use((config) => {
    if (config.headers) {
        // console.log({ config });
    }
    return config;
});

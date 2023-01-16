import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

/////////
const baseURL: string = process.env.REACT_APP_BASE_URL;
export const axiosIns = axios.create({baseURL});

axiosIns.defaults.timeout = 6000;
axiosIns.defaults.withCredentials = false;

axiosIns.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    },
);

axiosIns.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    },
);

import axios from "axios";

export interface AxiosDataInf {
    url: string;
    method: string;
    data?: unknown;
    header?: {[key: string]: string};
}

//서버와 통신할 때 받아오는 공통 데이터 규격
export interface ResponseBody {
    isSuccess: boolean; //성공 여부
    data?: {[key: string]: any}; //성공 시 응답 데이터

    redirectUrl?: string;
    cookie?: string | string[]; //새로운 쿠키
    authKey?: string; //
    statusCode?: number;
}

export async function callAxios(axiosDataProps: AxiosDataInf) {
    const axiosIns = getAxiosInstance(
        axiosDataProps.header
            ? axiosDataProps.header
            : {"Content-Type": "application/json"},
    );

    //multipart랑 서로 다르다.
    const axiosResult: ResponseBody = await axiosIns({
        url: axiosDataProps.url,
        method: axiosDataProps.method,
        data: axiosDataProps.data,
    })
        .then((response) => {
            // console.log("resp = ", response);
            return {
                isSuccess: true,
                data: response?.data ?? undefined,
            };
        })
        .catch((err): ResponseBody => {
            console.log("erro = ", err.response.data);
            return {
                isSuccess: false,
                data: err.response.data,
            };
        });
    return axiosResult;
}

export function getAxiosInstance(header: {[key: string]: string}) {
    const api = axios.create({
        withCredentials: false,
    });

    api.defaults.timeout = 6000;
    api.defaults.withCredentials = false;
    api.interceptors.request.use(
        async (config) => {
            //커스텀 헤더가 있다면 추가해준다.
            if (header !== undefined) {
                Object.keys(header).map((key) => {
                    config.headers[key] = header[key];
                });
            }

            return await config;
        },
        async (error) => {
            return Promise.reject(error);
        },
    );

    /**
     * 응답 인터셉터
     * 2개의 콜백 함수가 있다.
     *
     * 1) 응답 정상 : 인자값 : http response
     * 2) 응답 에러 : 인자값 : http error
     */
    api.interceptors.response.use(
        async (response) => {
            return await response;
        },
        async (error) => {
            return Promise.reject(error);
        },
    );

    return api;
}

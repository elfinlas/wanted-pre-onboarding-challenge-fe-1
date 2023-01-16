import {ServerLoginData} from "../types/server.data.type";
import {axiosIns} from "../utils/axios.util";

export interface LoginApiProps {
    email: string;
    pw: string;
}

export default async function LoginApi(props: LoginApiProps) {
    const url = process.env.REACT_APP_LOGIN_URL;
    const data: ServerLoginData = {email: props.email, password: props.pw};

    return axiosIns.post(url, data);
}

/*
// const aa =
    // const apiResult: AxiosResponse = callAxios({
    //     url,
    //     method: HTTP_POST,
    //     data,
    // });
    // return apiResult;
*/

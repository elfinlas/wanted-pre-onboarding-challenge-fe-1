import {SweetAlertOptions} from "sweetalert2";

//서버와 통신할 때 받아오는 공통 데이터 규격
export interface ResponseBody {
    isSuccess: boolean; //성공 여부
    data?: {[key: string]: any}; //성공 시 응답 데이터

    saOpt?: SweetAlertOptions<any, any>; //에러 메세지 표시에 처리

    redirectUrl?: string;
    cookie?: string | string[]; //새로운 쿠키
    authKey?: string; //
    statusCode?: number;
}

export interface ServerLoginData {
    email: string;
    password: string;
}

import {axiosIns} from "../utils/axios.util";

export interface SignUpApiProps {
    email: string;
    pw: string;
}

export default async function SignUpApi(props: SignUpApiProps) {
    const url = process.env.REACT_APP_SIGN_UP_URL;
    const data = {email: props.email, password: props.pw};

    return axiosIns.post(url, data);
}

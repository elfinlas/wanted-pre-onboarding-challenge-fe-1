import {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import LoginApi from "../../apis/api.login";
import {AuthViewMode, AUTH_VIEW_MODE} from "../../constants/view.mode";
import useLogin from "../../hooks/auth/login.mutation";
import {isEmail} from "../../utils/common.util";
import InputEmail from "../elements/input.email";
import InputPassword from "../elements/input.pw";

interface LoginProps {
    setViewMode: (mode: AuthViewMode) => void;
}

export default function Login(props: LoginProps) {
    const navigate = useNavigate();
    //상태 처리
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [valid, setValid] = useState(false);

    useEffect(() => {
        validRegData();
    }, [email, pw]);

    //검증 처리
    const validRegData = () => {
        setValid(isEmail(email) && pw.length >= 8);
    };

    //
    const {mutate: loginMutate} = useLogin({
        apiData: {email, pw},
        successAction: () => {
            navigate("/", {replace: true});
        },
        errorAction: (error: unknown) => {
            if (error instanceof AxiosError) {
                Swal.fire({
                    title: "로그인 실패",
                    html: error.response.data.details,
                    icon: "error",
                });
            } else {
                Swal.fire({
                    title: "로그인 실패",
                    html: "관리자에게 문의하세요.",
                    icon: "error",
                });
            }
        },
    });

    return (
        <>
            <form className="rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <InputEmail
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            const input = event.target.value;
                            setEmail(input);
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <InputPassword
                        placeholder="암호를 입력하세요"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            const input = event.target.value;
                            setPw(input);
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className={
                            "w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " +
                            (valid
                                ? "bg-green-500 hover:bg-green-700"
                                : "bg-slate-500")
                        }
                        type="button"
                        disabled={valid ? false : true}
                        onClick={() => {
                            loginMutate();
                        }}
                    >
                        Login
                    </button>
                </div>

                <div className="divider divider-vertical mt-10">or</div>

                <div className="flex items-center justify-between mt-10">
                    <button
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {
                            props.setViewMode(AUTH_VIEW_MODE.SIGN_IN);
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </form>
            {/* <div className="grid lg:grid-cols-6 grid-cols-1 p-20 ">
                <div className="lg:col-start-2 lg:col-span-4">
                    
                </div>
            </div> */}
        </>
    );
}

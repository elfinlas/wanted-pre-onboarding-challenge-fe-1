import {AxiosError} from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {AuthViewMode, AUTH_VIEW_MODE} from "../../constants/view.mode";
import useSignUp from "../../hooks/auth/sign.in.mutation";
import {isEmail} from "../../utils/common.util";
import InputEmail from "../elements/input.email";
import InputPassword from "../elements/input.pw";

interface SignUpProps {
    setViewMode: (mode: AuthViewMode) => void;
}

export default function SignUp(props: SignUpProps) {
    //상태 처리
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [validPw, setValidPw] = useState("");
    const [valid, setValid] = useState(false);

    useEffect(() => {
        validRegData();
    }, [email, pw, validPw]);

    const validRegData = () => {
        setValid(isEmail(email) && pw === validPw && pw.length >= 8);
    };

    const {mutate: signUpMutate} = useSignUp({
        apiData: {email, pw},
        successAction: () => {
            Swal.fire({
                title: "가입 성공",
                html: "회원 가입 성공",
                icon: "success",
            });
            props.setViewMode(AUTH_VIEW_MODE.LOGIN);
        },
        errorAction: (error: unknown) => {
            if (error instanceof AxiosError) {
                Swal.fire({
                    title: "가입 실패",
                    html: error.response.data.details,
                    icon: "error",
                });
            } else {
                Swal.fire({
                    title: "가입 실패",
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
                <div className="mb-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <InputPassword
                        placeholder="8자리 이상 유추하기 어려운 암호를 입력하세요."
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            const input = event.target.value;
                            setPw(input);
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Valid Password
                    </label>

                    <InputPassword
                        placeholder="위와 같은 암호를 입력하세요."
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            const input = event.target.value;
                            setValidPw(input);
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className={
                            " w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " +
                            (valid
                                ? "bg-blue-500 hover:bg-blue-700"
                                : "bg-slate-500")
                        }
                        disabled={valid ? false : true}
                        type="button"
                        onClick={() => {
                            signUpMutate();
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="divider divider-vertical mt-10">or</div>

                <div className="flex items-center justify-between mt-10">
                    <button
                        className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {
                            props.setViewMode(AUTH_VIEW_MODE.LOGIN);
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    );
}

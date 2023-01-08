/* eslint-disable react-hooks/exhaustive-deps */
// import shallow from "zustand/shallow";
// import {AuthViewModeStore} from "../../store/auth.view.mode";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import shallow from "zustand/shallow";
import {AuthViewModeStore} from "../../store/auth.view.mode.store";
import {LoadingStore} from "../../store/loading.store";
import {AUTH_VIEW_MODE} from "../../types/enums/view.mode";
import {callAxios} from "../../utils/axios.helper";
import {isEmail} from "../../utils/common.util";

interface SignUpProps {}

export default function SignUp(props: SignUpProps) {
    const [setAuthViewMode] = AuthViewModeStore(
        (state) => [state.setAuthViewMode],
        shallow,
    );
    const [setLoading] = LoadingStore((state) => [state.setLoading], shallow);

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [validPw, setValidPw] = useState("");
    const [valid, setValid] = useState(false);

    useEffect(() => {
        validRegData();
    }, [email, pw, validPw]);

    //이메일 입력 포커스 아웃
    const outFocus4Email = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setEmail(input);
    };

    const outFocus4Pw = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setPw(input);
    };

    const outFocus4ValidPw = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setValidPw(input);
    };

    const validRegData = () => {
        setValid(isEmail(email) && pw === validPw && pw.length >= 8);
    };

    const click4SignUp = async () => {
        setLoading(true);
        const url = "http://localhost:8081/users/create";
        const method = "post";
        const data = {email, password: pw};
        const result = await callAxios({url, method, data}).finally(() => {
            setLoading(false);
        });

        if (result.isSuccess) {
            Swal.fire({
                title: "가입 성공",
                html: "회원 가입 성공",
                icon: "success",
            });
            setAuthViewMode(AUTH_VIEW_MODE.LOGIN);
        } else {
            Swal.fire({
                title: "가입 실패",
                html: result.data.details,
                icon: "error",
            });
        }
    };
    return (
        <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="mb-10 text-2xl text-black font-bold">Sign-Up</h1>
                <div className="mb-8"></div>
                <div className="mb-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="8자리 이상 유추하기 어려운 암호를 입력하세요."
                        onBlur={outFocus4Pw}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="위와 같은 암호를 입력하세요."
                        onBlur={outFocus4ValidPw}
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
                            click4SignUp();
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
                            setAuthViewMode(AUTH_VIEW_MODE.LOGIN);
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    );
}

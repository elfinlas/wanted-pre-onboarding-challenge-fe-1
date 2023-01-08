/* eslint-disable react-hooks/exhaustive-deps */
// import shallow from "zustand/shallow";
// import {AuthViewModeStore} from "../../store/auth.view.mode";
import {AuthViewModeStore} from "../../store/auth.view.mode.store";
import {AUTH_VIEW_MODE} from "../../types/enums/view.mode";
import shallow from "zustand/shallow";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {isEmail} from "../../utils/common.util";
import {LoadingStore} from "../../store/loading.store";
import {callAxios} from "../../utils/axios.helper";
import Router from "next/router";

interface LoginProps {}

export default function Login(props: LoginProps) {
    const [setAuthViewMode] = AuthViewModeStore(
        (state) => [state.setAuthViewMode],
        shallow,
    );

    const [setLoading] = LoadingStore((state) => [state.setLoading], shallow);

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

    //Login Event
    const click4Login = async () => {
        if (email.length === 0 || pw.length === 0) {
            Swal.fire({
                title: "공백",
                html: "Email과 Password를 확인해주세요.",
                icon: "error",
            });
            return;
        }

        setLoading(true);
        const url = "http://localhost:8081/users/login";
        const method = "post";
        const data = {email, password: pw};
        const result = await callAxios({url, method, data}).finally(() => {
            setLoading(false);
        });

        if (result.isSuccess) {
            //토큰을 이렇게 저장할 경우 클라이언트를 한번 타게 되서 리다이렉션이 매끄럽지 못하다.
            //별도 쿠키 또는 httponly 등으로 처리해야 더 깔끔하다
            localStorage.setItem("token", result.data.token);
            Router.push("/");
        } else {
            Swal.fire({
                title: "로그인 실패",
                html: result.data.details,
                icon: "error",
            });
        }
    };

    return (
        <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="mb-10 text-2xl">Login</h1>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="가입한 Email을 입력하세요."
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
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
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
                        onClick={click4Login}
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
                            setAuthViewMode(AUTH_VIEW_MODE.SIGN_IN);
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </>
    );
}

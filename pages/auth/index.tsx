import {GetServerSidePropsContext} from "next";
import {useEffect, useState} from "react";
import Login from "../../components/auth/login";
import {AUTH_VIEW_MODE} from "../../types/enums/view.mode";
import SignUp from "../../components/auth/signup";
import {AuthViewModeStore} from "../../store/auth.view.mode.store";
import Swal from "sweetalert2";
import Router, {useRouter} from "next/router";

interface LoginSignPropsInf {
    data: {[key: string]: string};
}

export default function LoginSignPage(props: LoginSignPropsInf) {
    const {pathname, query, asPath, route} = useRouter();
    const router = useRouter();
    const [authViewMode] = AuthViewModeStore((state) => [state.authViewMode]);

    useEffect(() => {
        //쿼리가 존재한다면?
        if (Object.keys(query).length !== 0) {
            //쿼리를 날려준다.
            router.replace(pathname, undefined, {shallow: true});

            //쿼리에 담긴 내용을 찾아서 처리한다.
            if (query?.code === "logout") {
                Swal.fire({
                    title: "로그아웃",
                    html: "로그아웃 되었습니다.",
                    icon: "success",
                    confirmButtonText: "확인",
                });
            } else if (query?.code === "no_auth") {
                Swal.fire({
                    title: "권한 없음",
                    html: "로그인이 필요합니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                });
            }
        }
    }, [query]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        //토큰 존재 시 => 실효성 검사는 추후 스팩이 나오면 진행
        if (token) {
            Router.push("/");
        }
    }, []);

    return (
        <>
            <div className="bg-gray-200 h-screen flex items-center justify-center">
                <div className="w-full max-w-xl">
                    {authViewMode === AUTH_VIEW_MODE.LOGIN ? (
                        <Login />
                    ) : (
                        <SignUp />
                    )}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {},
    };
}

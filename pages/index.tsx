import {GetServerSidePropsContext} from "next";
import Router from "next/router";
import {useEffect} from "react";
import Swal from "sweetalert2";
import ToDoDetail from "../components/todo/detail/detail";
import ToDoList from "../components/todo/list/list";

export default function Home() {
    //토큰 확인부
    //실무에서는 아래와 같이 구현하지 않음 (getServerSideProps 등애서 처리하여 미리 리다이렉션 처리)
    useEffect(() => {
        const token = localStorage.getItem("token");
        //토큰에 문제가 있는 경우
        if (token === null || token.length === 0) {
            Router.push("/auth?code=no_auth");
        }
    }, []);

    //로그아웃 클릭
    const click4Logout = () => {
        Swal.fire({
            title: "로그아웃",
            text: "로그아웃 하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "로그아웃",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                Router.push("/auth?code=logout");
            }
        });
    };

    return (
        <div className="w-full h-screen">
            <div className="grid grid-cols-3">
                <div className="col-span-2"></div>
                <div className="p-5">
                    <button
                        className="btn w-full btn-outline"
                        onClick={click4Logout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* 실제 콘텐츠 표시 부분 */}
            <div className="grid grid-cols-2 gap-5 mt-10">
                <ToDoList />
                <ToDoDetail />
            </div>
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {},
    };
}

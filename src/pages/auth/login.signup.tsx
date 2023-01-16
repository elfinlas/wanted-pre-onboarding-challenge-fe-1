import {useEffect, useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import Swal from "sweetalert2";
import Login from "../../components/auth/login";
import SignUp from "../../components/auth/sign.up";
import {AuthViewMode, AUTH_VIEW_MODE} from "../../constants/view.mode";
import QueryRemover from "../../hooks/common/query.remover";

export default function LoginSignUpPage() {
    const [viewMode, setViewMode] = useState<AuthViewMode>(
        AUTH_VIEW_MODE.LOGIN,
    );

    //쿼리를 지워준다.
    QueryRemover({
        query: "code",
        excuteFunc: () => {
            Swal.fire({
                title: "로그아웃",
                html: "로그아웃 되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            });
        },
    });

    return (
        <>
            <div className="w-full h-screen">
                <h1 className="text-3xl text-center p-5">
                    {viewMode === AUTH_VIEW_MODE.LOGIN ? "Login" : "Sign Up"}
                </h1>

                <div className="grid lg:grid-cols-6 grid-cols-1 p-20 ">
                    <div className="lg:col-start-3 lg:col-span-4 bg-orange-400 rounded-2xl lg:col-end-5 shadow-md">
                        {viewMode === AUTH_VIEW_MODE.LOGIN ? (
                            <Login setViewMode={setViewMode} />
                        ) : (
                            <SignUp setViewMode={setViewMode} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

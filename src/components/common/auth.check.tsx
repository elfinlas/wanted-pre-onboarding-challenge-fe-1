import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {LOCAL_STORAGE_KEY_TOKEN} from "../../constants/common";

export interface AuthCheckProps {
    children?: React.ReactNode;
}

export default function AuthCheck({children}: AuthCheckProps) {
    const nav = useNavigate();
    const {pathname} = useLocation();
    const needAuthPages = ["/auth"];

    useEffect(() => {
        const hasToken = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);
    }, []);

    /*
    useEffect(() => {
    const hasToken = !!localStorage.getItem("token");
    if (hasToken && isAuthPage) {
      showToast("warning", "이미 로그인 되어있습니다.");
      navigate("/todos", { replace: true });
    }
  }, [navigate, showToast, isAuthPage]);
    */

    return <>{children}</>;
}

import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import Logout from "../../hooks/auth/logout";

export default function LogoutButton() {
    const navigate = useNavigate();
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
                Logout();
                navigate("/auth?code=logout", {replace: true});
            }
        });
    };

    return (
        <button className="btn " onClick={click4Logout}>
            Logout
        </button>
    );
}

import {Route, Routes} from "react-router-dom";
import LoginSignUpPage from "../../pages/auth/login.signup";
import NotFound404 from "../../pages/errors/404";
import ToDoPage from "../../pages/todo";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<ToDoPage />} />
            <Route path="/auth" element={<LoginSignUpPage />} />
            <Route path="*" element={<NotFound404 />} />
        </Routes>
    );
}

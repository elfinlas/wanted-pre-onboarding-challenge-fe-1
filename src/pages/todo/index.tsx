import {AxiosError, AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {shallow} from "zustand/shallow";
import Swal from "sweetalert2";
import LogoutButton from "../../components/common/logout.button";
import ToDoDetail from "../../components/todo/detail/todo.detail";
import ToDoModal from "../../components/todo/detail/modal/todo.modal";
import ToDoList from "../../components/todo/list/todo.list";
import useToDoList from "../../hooks/todo/todo.list.mutation";
import {TodoStore} from "../../store/todo.store";

export default function ToDoPage() {
    const [setTodoItemList] = TodoStore((state) => [state.setList], shallow);

    //모달 입력 / 수정 모드 (리팩토링 필요)
    const [isAddModal, setIsAddModal] = useState(true);

    const {mutate: todoListMutate} = useToDoList({
        successAction: (apiResponse: AxiosResponse) => {
            //아이템을 심어준다.
            setTodoItemList(apiResponse.data.data);
        },
        errorAction: (error: unknown) => {
            if (error instanceof AxiosError) {
                Swal.fire({
                    title: "데이터 조회 실패",
                    html: error.response.data.details,
                    icon: "error",
                });
            } else {
                Swal.fire({
                    title: "데이터 조회 실패",
                    html: "관리자에게 문의하세요.",
                    icon: "error",
                });
            }
        },
    });

    useEffect(() => {
        todoListMutate();
    }, []);

    return (
        <div className="w-full h-screen">
            <h1 className="text-3xl text-center p-5">TO-DO</h1>

            {/* Content */}
            <div className="grid lg:grid-cols-6 grid-cols-1 ">
                <div className="lg:col-start-2 lg:col-span-4 bg-orange-100 rounded-2xl">
                    <div className="text-right p-2">
                        <LogoutButton />
                    </div>

                    {/* 실제 콘텐츠 표시 부분 */}
                    <div className="grid grid-cols-2 gap-5 p-5 ">
                        <ToDoList setIsAddModal={setIsAddModal} />
                        <ToDoDetail setIsAddModal={setIsAddModal} />
                    </div>
                </div>
            </div>
            <ToDoModal isAdd={isAddModal} />
        </div>
    );
}

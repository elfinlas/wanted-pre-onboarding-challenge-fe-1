import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import shallow from "zustand/shallow";
import {LoadingStore} from "../../store/loading.store";
import {TodoStore} from "../../store/todo/todo.store";
import {callAxios} from "../../utils/axios.helper";
import ToDoContent from "./detail/detail.content";
import ToDoTitle from "./detail/detail.title";

interface ToDoAddModalProps {}

export default function ToDoAddModal(props: ToDoAddModalProps) {
    const [setLoading] = LoadingStore((state) => [state.setLoading], shallow);

    const [todoItem, setToDoItem, addItem] = TodoStore((state) => [
        state.item,
        state.setItem,
        state.addItem,
    ]);

    const [addMode, setMode] = useState(true);

    useEffect(() => {
        setMode(todoItem.id.length === 0);
    }, [todoItem]);

    const click4SaveItem = async () => {
        if (todoItem.title.length === 0 || todoItem.content.length === 0) {
            Swal.fire("입력 누락", "제목과 내용을 확인해주새요.", "error");
            return;
        }

        setLoading(true);
        const url = addMode
            ? "http://localhost:8081/todos/"
            : "http://localhost:8081/todos/" + todoItem.id;
        const method = addMode ? "post" : "put";
        const token = localStorage.getItem("token");
        const data = {title: todoItem.title, content: todoItem.content};

        const result = await callAxios({
            url,
            method,
            data,
            header: {authorization: token},
        }).finally(() => {
            setLoading(false);
        });

        if (result.isSuccess) {
            Swal.fire({
                title: (addMode ? "등록" : "수정") + " 성공",
                html: (addMode ? "등록" : "수정") + " 성공하였습니다.",
                icon: "success",
            });

            addMode ? addItem(result.data.data) : setToDoItem(result.data.data);

            //모달을 닫아준다.
            document.getElementById("my-modal").click();
        } else {
            Swal.fire({
                title: (addMode ? "등록" : "수정") + " 실패",
                html: result.data.details,
                icon: "error",
            });
        }
    };

    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative">
                    <h1 className="text-2xl text-center font-bold">
                        To-Do {addMode ? "등록" : "수정"}
                    </h1>
                    <ToDoTitle wrapperClass="mt-10" />
                    <ToDoContent wrapperClass="mt-10" />

                    <div className="modal-action">
                        <button className="btn" onClick={click4SaveItem}>
                            {addMode ? "등록" : "수정"}
                        </button>
                    </div>
                </label>
            </label>
        </>
    );
}

import {GetServerSidePropsContext} from "next";
import {useEffect} from "react";
import Swal from "sweetalert2";
import shallow from "zustand/shallow";
import {LoadingStore} from "../../../store/loading.store";
import {TodoStore} from "../../../store/todo/todo.store";
import {ToDoItem} from "../../../types/todo.type";
import {callAxios} from "../../../utils/axios.helper";
import ToDoAddButton from "../add.button";
import ToDoListTable from "./list.table";

interface ToDoListProps {}

export default function ToDoList(props: ToDoListProps) {
    const [setLoading] = LoadingStore((state) => [state.setLoading], shallow);
    const [todoItemList, setTodoItemList, clearList] = TodoStore((state) => [
        state.itemList,
        state.setList,
        state.clearList,
    ]);

    const getToDoItem = async () => {
        const url = "http://localhost:8081/todos/";
        const method = "get";
        const token = localStorage.getItem("token");
        const result = await callAxios({
            url,
            method,
            header: {authorization: token},
        }).finally(() => {
            setLoading(false);
        });

        if (result.isSuccess) {
            if (todoItemList.length !== 0) {
                clearList();
            }

            if (result.data?.data) {
                setTodoItemList(result.data.data);
            }
        } else {
            Swal.fire({
                title: "조회 실패",
                html: result.data.details,
                icon: "error",
            });
        }
    };

    useEffect(() => {
        getToDoItem();
    }, []);

    return (
        <div className="bg-red-200 rounded-3xl ml-5">
            {/* Menu */}
            <div className="grid grid-cols-3 text-center p-3">
                <div></div>
                <div className="mt-2">
                    <h1 className="text-2xl text-red-600 font-bold">
                        To-Do List
                    </h1>
                </div>
                <div className="text-right">
                    <ToDoAddButton />
                </div>
            </div>

            {/* Content  */}
            <div className="p-10">
                <ToDoListTable />
            </div>
        </div>
    );
}

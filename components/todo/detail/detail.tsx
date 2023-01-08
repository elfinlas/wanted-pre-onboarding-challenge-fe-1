import Swal from "sweetalert2";
import shallow from "zustand/shallow";
import {LoadingStore} from "../../../store/loading.store";
import {TodoStore} from "../../../store/todo/todo.store";
import {callAxios} from "../../../utils/axios.helper";
import ToDoAddModal from "../todo.add.modal";
import ToDoContent from "./detail.content";
import ToDoTitle from "./detail.title";

interface ToDoDetailProps {}

export default function ToDoDetail(props: ToDoDetailProps) {
    const [item, setItem, removeItem] = TodoStore(
        (state) => [state.item, state.setItem, state.removeItem],
        shallow,
    );

    const [setLoading] = LoadingStore((state) => [state.setLoading], shallow);

    const click4DeleteBt = () => {
        Swal.fire({
            title: "삭제",
            text: "해당 아이템을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");

                const result = await callAxios({
                    url: "http://localhost:8081/todos/" + item.id,
                    method: "delete",
                    header: {authorization: token},
                }).finally(() => {
                    setLoading(false);
                });

                if (result.isSuccess) {
                    Swal.fire({
                        title: "삭제 성공",
                        html: "삭제 성공하였습니다.",
                        icon: "success",
                    });

                    removeItem(item);
                    setItem({
                        id: "",
                        title: "",
                        content: "",
                        createdAt: "",
                        updatedAt: "",
                    });
                } else {
                    Swal.fire({
                        title: "삭제 실패",
                        html: result.data.details,
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <>
            <div className="w-full h-full mr-5">
                <div className="card w-11/12 bg-red-400 shadow-xl">
                    <div className="card-body">
                        {item?.id ? (
                            <>
                                <h2 className="text-3xl dark:text-rose-700 text-amber-100">
                                    To-Do Detail
                                </h2>
                                <h2 className="card-title dark:text-amber-400 mt-5 font-bold text-yellow-100">
                                    {item.title}
                                </h2>
                                <p className="mt-5 dark:text-amber-300 text-yellow-100">
                                    {item.content}
                                </p>
                                <div className="card-actions justify-end mt-10">
                                    <label
                                        htmlFor="my-modal"
                                        className="btn bg-orange-400 border-orange-400 hover:bg-orange-600 hover:border-orange-700"
                                    >
                                        수정
                                    </label>
                                    <button
                                        className="btn bg-red-500 hover:bg-red-600"
                                        onClick={click4DeleteBt}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl dark:text-teal-800">
                                    To-do data not select..
                                </h2>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ToDoAddModal />
        </>
    );
}

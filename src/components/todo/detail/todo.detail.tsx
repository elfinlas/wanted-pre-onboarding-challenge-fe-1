import {useState} from "react";
import {shallow} from "zustand/shallow";
import {TodoStore} from "../../../store/todo.store";
import {ToDoItem} from "../../../types/todo.type";
import ToDoModal from "./modal/todo.modal";

interface ToDoDetailProps {
    setIsAddModal: (mode: boolean) => void;
}

export default function ToDoDetail(props: ToDoDetailProps) {
    const [selectItem, setSelectItem] = TodoStore(
        (state) => [state.selectItem, state.setSelectItem],
        shallow,
    );

    return (
        <div className="w-full h-full mr-5">
            <div className="card w-11/12 bg-red-400 shadow-xl">
                <div className="card-body">
                    {setSelectItem !== null ? (
                        <>
                            <h2 className="text-3xl dark:text-rose-700 text-amber-100">
                                To-Do Detail
                            </h2>
                            <h2 className="card-title dark:text-amber-400 mt-5 font-bold text-yellow-100">
                                {selectItem.title}
                            </h2>
                            <p className="mt-5 dark:text-amber-300 text-yellow-100">
                                {selectItem.content}
                            </p>
                            <div className="card-actions justify-end mt-10">
                                <label
                                    htmlFor="my-modal"
                                    className="btn bg-orange-400 border-orange-400 hover:bg-orange-600 hover:border-orange-700 text-white"
                                    onClick={() => {
                                        props.setIsAddModal(false);
                                    }}
                                >
                                    수정
                                </label>
                                <button
                                    className="btn bg-red-500 hover:bg-red-600 text-white"
                                    // onClick={click4DeleteBt}
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
    );
}

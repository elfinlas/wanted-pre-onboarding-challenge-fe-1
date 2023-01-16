import {shallow} from "zustand/shallow";
import {TodoStore} from "../../../../store/todo.store";
import {ToDoItem} from "../../../../types/todo.type";
import ToDoModalContent from "./todo.modal.content";
import ToDoModalTitle from "./todo.modal.title";

interface ToDoModalProps {
    isAdd: boolean;
}

export default function ToDoModal(props: ToDoModalProps) {
    const [selectItem] = TodoStore((state) => [state.selectItem], shallow);

    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative">
                    <h1 className="text-2xl text-center font-bold">
                        To-Do {props.isAdd ? "등록" : "수정"}
                    </h1>
                    <ToDoModalTitle wrapperClass="mt-10" />
                    <ToDoModalContent wrapperClass="mt-10" />

                    <div className="modal-action">
                        <button className="btn" onClick={click4SaveItem}>
                            {props.isAdd ? "등록" : "수정"}
                        </button>
                    </div>
                </label>
            </label>
        </>
    );
}

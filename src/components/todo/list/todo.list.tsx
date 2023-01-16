import {ToDoItem} from "../../../types/todo.type";
import ToDoTableList from "./todo.list.table";

interface ToDoListProps {
    setIsAddModal: (mode: boolean) => void;
}

export default function ToDoList(props: ToDoListProps) {
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
                    <label
                        htmlFor="my-modal"
                        className="btn bg-rose-500 hover:bg-rose-600 border-rose-600 text-white"
                        onClick={() => {
                            props.setIsAddModal(true);
                        }}
                    >
                        Add Item
                    </label>
                </div>
            </div>

            {/* Content  */}
            <div className="p-10">
                <ToDoTableList />
            </div>
        </div>
    );
}

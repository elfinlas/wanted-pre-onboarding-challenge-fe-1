import shallow from "zustand/shallow";
import {TodoStore} from "../../store/todo/todo.store";

interface ToDoAddBtProps {}

export default function ToDoAddButton(props: ToDoAddBtProps) {
    const [setItem] = TodoStore((state) => [state.setItem], shallow);

    const click4Bt = () => {
        setItem({id: "", title: "", content: "", createdAt: "", updatedAt: ""});
    };

    return (
        <>
            <label
                htmlFor="my-modal"
                className="btn bg-rose-500 hover:bg-rose-600"
                onClick={click4Bt}
            >
                Add Item
            </label>
        </>
    );
}

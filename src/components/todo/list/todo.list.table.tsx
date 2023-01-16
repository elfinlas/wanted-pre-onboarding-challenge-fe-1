import {shallow} from "zustand/shallow";
import {TodoStore} from "../../../store/todo.store";
import {ToDoItem} from "../../../types/todo.type";

interface ToDoTableListProps {}

export default function ToDoTableList(props: ToDoTableListProps) {
    const [todoItemList, setSelectItem] = TodoStore(
        (state) => [state.itemList, state.setSelectItem],
        shallow,
    );

    return (
        <>
            <table className="table w-full">
                <thead>
                    <tr className="text-center">
                        <th>To Do List</th>
                    </tr>
                </thead>
                <tbody>
                    {todoItemList.map((item: ToDoItem, index: number) => {
                        return (
                            <tr key={index + "-" + item.id}>
                                <td
                                    onClick={() => {
                                        setSelectItem(
                                            todoItemList.find(
                                                (el: ToDoItem) =>
                                                    el.id === item.id,
                                            ),
                                        );
                                    }}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault}
                                    >
                                        {item.title}
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

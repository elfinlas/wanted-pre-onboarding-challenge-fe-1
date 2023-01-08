import shallow from "zustand/shallow";
import {TodoStore} from "../../../store/todo/todo.store";
import {ToDoItem} from "../../../types/todo.type";

interface ToDoListTableProps {}

export default function ToDoListTable(props: ToDoListTableProps) {
    // const [
    //     todoItemList,
    //     setId,
    //     setTitle,
    //     setContent,
    //     setCreatedAt,
    //     setUpdatedAt,
    // ] = TodoStore(
    //     (state) => [
    //         state.itemList,
    //         state.setId,
    //         state.setTitle,
    //         state.setContent,
    //         state.setCreatedAt,
    //         state.setUpdatedAt,
    //     ],
    //     shallow,
    // );

    const [todoItemList, it, setItem] = TodoStore(
        (state) => [state.itemList, state.item, state.setItem],
        shallow,
    );

    const click4Item = (id: string) => {
        const findItem: ToDoItem = todoItemList.find(
            (item: ToDoItem) => item.id === id,
        );

        setItem(findItem);

        // setId(findItem.id);
        // setTitle(findItem.title);
        // setContent(findItem.content);
        // setCreatedAt(findItem.createdAt);
        // setUpdatedAt(findItem.updatedAt);
    };

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
                                        click4Item(item.id);
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

import shallow from "zustand/shallow";
import {TodoStore} from "../../../store/todo/todo.store";

interface ToDoContentProps {
    wrapperClass?: string;
}

export default function ToDoContent(props: ToDoContentProps) {
    const [item, setItem] = TodoStore(
        (state) => [state.item, state.setItem],
        shallow,
    );

    const outFocus4Content = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const input = event.target.value;
        setItem({...item, content: input});
    };

    const onChange4Content = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const input = event.target.value;
        setItem({...item, content: input});
    };

    return (
        <div className={props.wrapperClass ? props.wrapperClass : ""}>
            <label
                className="block text-slate-700 text-sm font-bold mb-2"
                htmlFor="content"
            >
                Content
            </label>
            <textarea
                id="content"
                className="textarea textarea-bordered h-24 w-full dark:text-slate-200"
                placeholder="ToDo content"
                value={item?.content ? item.content : ""}
                onChange={onChange4Content}
                onFocus={outFocus4Content}
            ></textarea>
        </div>
    );
}

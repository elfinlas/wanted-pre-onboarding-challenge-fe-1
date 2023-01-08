import shallow from "zustand/shallow";
import {TodoStore} from "../../../store/todo/todo.store";

interface ToDoTitleProps {
    wrapperClass?: string;
}

export default function ToDoTitle(props: ToDoTitleProps) {
    const [item, setItem] = TodoStore(
        (state) => [state.item, state.setItem],
        shallow,
    );

    const outFocus4Title = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setItem({...item, title: input});
    };

    const onChange4Title = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setItem({...item, title: input});
    };

    return (
        <div className={props.wrapperClass ? props.wrapperClass : ""}>
            <label
                className="block text-slate-700 text-sm font-bold mb-2"
                htmlFor="email"
            >
                Title
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline dark:text-slate-200"
                id="title"
                type="text"
                value={item?.title ? item.title : ""}
                placeholder="To do title"
                onChange={onChange4Title}
                onBlur={outFocus4Title}
            />
        </div>
    );
}

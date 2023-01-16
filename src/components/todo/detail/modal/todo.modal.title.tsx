import {useState} from "react";
import {shallow} from "zustand/shallow";
import {TodoStore} from "../../../../store/todo.store";
import {ToDoItem} from "../../../../types/todo.type";

interface ToDoModalTitleProps {
    wrapperClass?: string;
}

export default function ToDoModalTitle(props: ToDoModalTitleProps) {
    const [selectItem, setSelectItem] = TodoStore(
        (state) => [state.selectItem, state.setSelectItem],
        shallow,
    );

    const outFocus4Title = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSelectItem({...selectItem, title: input});
    };

    const onChange4Title = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSelectItem({...selectItem, title: input});
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
                value={selectItem?.title ? selectItem.title : ""}
                placeholder="To do title"
                onChange={onChange4Title}
                onBlur={outFocus4Title}
            />
        </div>
    );
}

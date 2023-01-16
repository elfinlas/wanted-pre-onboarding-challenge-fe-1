import {shallow} from "zustand/shallow";
import {TodoStore} from "../../../../store/todo.store";

interface ToDoModalContentProps {
    wrapperClass?: string;
}

export default function ToDoModalContent(props: ToDoModalContentProps) {
    const [selectItem, setSelectItem] = TodoStore(
        (state) => [state.selectItem, state.setSelectItem],
        shallow,
    );

    const outFocus4Content = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const input = event.target.value;
        setSelectItem({...selectItem, content: input});
    };

    const onChange4Content = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const input = event.target.value;
        setSelectItem({...selectItem, content: input});
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
                value={selectItem?.content ? selectItem.content : ""}
                onChange={onChange4Content}
                onFocus={outFocus4Content}
            ></textarea>
        </div>
    );
}

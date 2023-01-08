import create from "zustand";
import {ToDoListSlice} from "./\btodo.list.slice";
import {ToDoItemSlice} from "./todo.item.slice";

const totalStore = (set: any, get: any) => ({
    // ...ToDoTitleSlice(set),
    // ...ToDoContentSlice(set),
    ...ToDoItemSlice(set),
    ...ToDoListSlice(set),
});

export const TodoStore = create(totalStore);

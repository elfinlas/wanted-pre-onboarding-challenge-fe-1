import {create} from "zustand";
import {ToDoListSlice} from "./todo/todo.list.slice";

const totalStore = (set: any, get: any) => ({
    ...ToDoListSlice(set),
});

export const TodoStore = create(totalStore);

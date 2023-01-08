import {StoreApi} from "zustand";
import {ToDoItem} from "../../types/todo.type";

interface ToDoItemInf {
    item: ToDoItem;
    // id: string;
    // title: string;
    // content: string;
    // createdAt: string;
    // updatedAt: string;

    setItem: (item: ToDoItem) => void;
    // setId: (id: string) => void;
    // setTitle: (title: string) => void;
    // setContent: (content: string) => void;
    // setCreatedAt: (createdAt: string) => void;
    // setUpdatedAt: (updatedAt: string) => void;
}

export const ToDoItemSlice = (set: StoreApi<ToDoItemInf>["setState"]) => ({
    item: {id: "", title: "", content: "", createdAt: "", updatedAt: ""},
    // id: "",
    // title: "",
    // content: "",
    // createdAt: "",
    // updatedAt: "",

    setItem(sendItem: ToDoItem) {
        set((state) => ({item: {...state.item, ...sendItem}}));
    },
    // setId(id: string) {
    //     set(() => ({id}));
    // },
    // setTitle(title: string) {
    //     set(() => ({title}));
    // },
    // setContent(content: string) {
    //     set(() => ({content}));
    // },
    // setCreatedAt(createdAt: string) {
    //     set(() => ({createdAt}));
    // },
    // setUpdatedAt(updatedAt: string) {
    //     set(() => ({updatedAt}));
    // },
});

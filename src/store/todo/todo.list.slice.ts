import {StoreApi} from "zustand";
import {ToDoItem} from "../../types/todo.type";

interface ToDoListInf {
    itemList: ToDoItem[];
    addItem: (item: ToDoItem) => void;
    removeItem: (item: ToDoItem) => void;
    setList: (itemList: ToDoItem[]) => void;

    selectItem: ToDoItem;
    setSelectItem: (item: ToDoItem) => void;
}

export const ToDoListSlice = (set: StoreApi<ToDoListInf>["setState"]) => ({
    itemList: [] as ToDoItem[],
    addItem(item: ToDoItem) {
        set((state) => ({itemList: [...state.itemList, item]}));
    },
    removeItem(item: ToDoItem) {
        set((state) => ({
            itemList: state.itemList.filter(
                (targetItem: ToDoItem) => item.id !== targetItem.id,
            ),
        }));
    },
    setList(itemList: ToDoItem[]) {
        set(() => ({itemList}));
    },

    //
    selectItem: {id: "", title: "", content: "", createdAt: "", updatedAt: ""},
    setSelectItem(sendItem: ToDoItem) {
        set((state) => ({selectItem: {...state.selectItem, ...sendItem}}));
    },
});

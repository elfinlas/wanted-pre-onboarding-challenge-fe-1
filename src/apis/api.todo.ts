import {LOCAL_STORAGE_KEY_TOKEN} from "../constants/common";
import {axiosIns} from "../utils/axios.util";

export interface ToDoListProps {}

export default async function ToDoListApi(props: ToDoListProps) {
    const url = process.env.REACT_APP_TODO_LIST_URL;

    return axiosIns.get(url, {
        headers: {authorization: localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)},
    });
}

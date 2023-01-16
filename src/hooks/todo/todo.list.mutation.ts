import {AxiosResponse} from "axios";
import {useMutation} from "react-query";
import ToDoListApi from "../../apis/api.todo";
import {UseMutationProps} from "../../types/use.mutation.type";

interface UseToDoListProps extends UseMutationProps {}

export default function useToDoList(props: UseToDoListProps) {
    return useMutation("ToDoListApi", () => ToDoListApi({}), {
        onSuccess: (apiData: AxiosResponse) => {
            //기타 처리할 작업을 진행한다.
            props.successAction(apiData);
        },
        onError(error, variables, context) {
            props.errorAction(error);
        },
    });
}

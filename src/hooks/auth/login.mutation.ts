import {AxiosResponse} from "axios";
import {useMutation} from "react-query";
import LoginApi, {LoginApiProps} from "../../apis/api.login";
import {LOCAL_STORAGE_KEY_TOKEN} from "../../constants/common";
import {UseMutationProps} from "../../types/use.mutation.type";

interface UseLoginProps extends UseMutationProps {
    apiData: LoginApiProps;
}

export default function useLogin(props: UseLoginProps) {
    return useMutation(
        "LoginApi",
        () => LoginApi({email: props.apiData.email, pw: props.apiData.pw}),
        {
            onSuccess: (apiData: AxiosResponse) => {
                //먼저 키를 넣어준다.
                localStorage.setItem(
                    LOCAL_STORAGE_KEY_TOKEN,
                    apiData.data.token,
                );

                //기타 처리할 작업을 진행한다.
                props.successAction();
            },
            onError(error, variables, context) {
                props.errorAction(error);
            },
        },
    );
}

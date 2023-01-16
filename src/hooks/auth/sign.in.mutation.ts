import {AxiosResponse} from "axios";
import {useMutation} from "react-query";
import SignUpApi, {SignUpApiProps} from "../../apis/api.signup";
import {UseMutationProps} from "../../types/use.mutation.type";

interface UseSignUpProps extends UseMutationProps {
    apiData: SignUpApiProps;
}

export default function useSignUp(props: UseSignUpProps) {
    return useMutation(
        "SignUpApi",
        () => SignUpApi({email: props.apiData.email, pw: props.apiData.pw}),
        {
            onSuccess: (apiData: AxiosResponse) => {
                //기타 처리할 작업을 진행한다.
                props.successAction();
            },
            onError(error, variables, context) {
                props.errorAction(error);
            },
        },
    );
}

/*

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

*/

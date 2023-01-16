interface InputPasswordProps {
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputPassword(props: InputPasswordProps) {
    return (
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:text-slate-100"
            id="password"
            type="password"
            placeholder={props.placeholder}
            onChange={props.onChange ? props.onChange : null}
        />
    );
}

/*
className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="8자리 이상 유추하기 어려운 암호를 입력하세요."


shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:text-slate-100
shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 mb-3 leading-tight focus:outline-none focus:shadow-outline
*/

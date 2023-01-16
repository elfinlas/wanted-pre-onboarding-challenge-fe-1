interface InputEmailProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // setEmail: (email: string) => void;
}

export default function InputEmail(props: InputEmailProps) {
    return (
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-slate-100"
            id="email"
            type="text"
            placeholder="가입한 Email을 입력하세요."
            onChange={props.onChange ? props.onChange : null}
        />
    );
}

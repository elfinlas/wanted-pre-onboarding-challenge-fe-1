interface Input4Email {
    labelText: string;
    inputPlaceHolder: string;
    refFunc: Function;
    defaultInputValue?: string;
}

export default function Input4Email(props: Input4Email) {
    return (
        <>
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
            >
                Email
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                // ref={}
            />
        </>
    );
}

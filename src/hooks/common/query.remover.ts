import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

interface QueryRemoverProps {
    query: string;
    excuteFunc?: Function;
}

export default function QueryRemover({query, excuteFunc}: QueryRemoverProps) {
    const [searchParam, setSearchParam] = useSearchParams();
    useEffect(() => {
        if (searchParam.has(query)) {
            searchParam.delete(query);
            setSearchParam(searchParam);
            if (excuteFunc) {
                excuteFunc();
            }
        }
    }, []);
}

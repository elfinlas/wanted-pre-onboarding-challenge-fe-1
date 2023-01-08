import create, {StateCreator} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface LoadingInf {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const store: StateCreator<LoadingInf> = (set: any) => ({
    loading: false,
    setLoading: (loading1: boolean) => {
        set(() => ({loading: loading1}));
    },
});

//개발환경과 프로덕션 환경 나누기
export const LoadingStore = create<LoadingInf>()(store);

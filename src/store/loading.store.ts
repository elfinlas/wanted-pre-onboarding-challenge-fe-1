import {StateCreator, create} from "zustand";

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

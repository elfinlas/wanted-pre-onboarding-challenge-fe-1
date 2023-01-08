import {StateCreator} from "zustand";
import create from "zustand";

import {AuthViewMode, AUTH_VIEW_MODE} from "../types/enums/view.mode";

interface AuthViewModeStoreInf {
    authViewMode: AuthViewMode;
    setAuthViewMode: (authViewMode: AuthViewMode) => void;
}

const store: StateCreator<AuthViewModeStoreInf> = (set: any) => ({
    authViewMode: AUTH_VIEW_MODE.LOGIN,
    setAuthViewMode: (authViewMode: AuthViewMode) => {
        set(() => ({
            authViewMode,
        }));
    },
});

export const AuthViewModeStore = create<AuthViewModeStoreInf>()(store);

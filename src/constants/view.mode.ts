/////////////////////////
//      View Mode
/////////////////////////

import {MultiTyper} from "../types/common";

export const AUTH_VIEW_MODE = {
    LOGIN: "login",
    SIGN_IN: "sign_in",
} as const;

//외부 사용 타입
export type AuthViewMode = MultiTyper<typeof AUTH_VIEW_MODE>;

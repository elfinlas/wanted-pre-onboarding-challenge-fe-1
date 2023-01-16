/**
 * Hook쪽에 둔 이유 : 향후 확장성을 위해
 */

import {LOCAL_STORAGE_KEY_TOKEN} from "../../constants/common";

export default function Logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
}

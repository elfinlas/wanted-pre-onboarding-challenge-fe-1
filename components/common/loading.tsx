import {PacmanLoader, RingLoader} from "react-spinners";
import shallow from "zustand/shallow";
import {LoadingStore} from "../../store/loading.store";

interface LoadingProps {}

export default function LoadingComponent(props: LoadingProps) {
    const [loading] = LoadingStore((state) => [state.loading], shallow);
    return (
        <div
            className={
                "fixed left-[46%] top-[39%] z-50 block h-full w-full c_phone:left-[36%] c_phone:top-[35%] " +
                (loading ? "" : "hidden")
            }
        >
            <RingLoader
                color="#189b81"
                loading={loading}
                size={150}
                speedMultiplier={1}
            />
        </div>
    );
}

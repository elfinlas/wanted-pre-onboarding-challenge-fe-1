import "../styles/globals.css";
import type {AppProps} from "next/app";
import LoadingComponent from "../components/common/loading";
import {LoadingStore} from "../store/loading.store";
import shallow from "zustand/shallow";
import {useEffect} from "react";
import {Router} from "next/router";

export default function App({Component, pageProps}: AppProps) {
    //Store
    const [loading, setLoading] = LoadingStore(
        (state) => [state.loading, state.setLoading],
        shallow,
    );

    useEffect(() => {
        const start = () => {
            // nProgress.start();
            setLoading(true);
        };
        const end = () => {
            // nProgress.done();
            setLoading(false);
        };

        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);

        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <>
            <div className={loading ? "pointer-events-none blur-sm" : ""}>
                <Component {...pageProps} />
            </div>
            <LoadingComponent />
        </>
    );
}

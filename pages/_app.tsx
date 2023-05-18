import React from "react";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

import Header from "components/header";
import {
    NextAuthContext,
    NextAuthProvider,
} from "components/context/next-auth";

//@ts-ignore
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <NextAuthProvider>
                <div
                // className="flex flex-col min-h-full"
                >
                    <Header />
                    <div className="flex grow [&>*]:grow">
                        <Component {...pageProps} />
                    </div>
                </div>
            </NextAuthProvider>
        </SessionProvider>
    );
}

export default MyApp;

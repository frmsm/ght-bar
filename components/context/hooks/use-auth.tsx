import React, { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "pages/_app";
import Router from "next/router";

export const AuthContext = React.createContext({});

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        //@ts-ignore
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                //@ts-ignore
                setCurrentUser(user);
            } else {
                const pathname = Router.pathname.toLowerCase();
                if (pathname === "/login" || pathname === "/signup") {
                    // setPending(false);
                } else {
                    Router.push("/login");
                }
            }
        });
        setPending(false);
        return unsubscribe;
    }, []);

    // useEffect(() => {
    //     const handlePageChangeComplete = () => setPending(false);
    //     const handlePageChangeStart = () => setPending(true);

    //     Router.events.on("routeChangeStart", handlePageChangeStart);
    //     Router.events.on("routeChangeComplete", handlePageChangeComplete);

    //     return () => {
    //         Router.events.off("routeChangeStart", handlePageChangeStart);
    //         Router.events.off("routeChangeComplete", handlePageChangeComplete);
    //     };
    // }, []);

    return { currentUser, setCurrentUser, pending };
};

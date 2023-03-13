import React, { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "pages/_app";
import Router from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export const AuthContext = React.createContext({});

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    console.log(currentUser);

    useEffect(() => {
        //@ts-ignore
        const auth = getAuth(app);

        console.log("test auth");
        //@ts-ignore
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const pathname = Router.pathname.toLowerCase();
            console.log("auth auth auth");
            if (user) {
                //@ts-ignore
                setCurrentUser(user);

                if (pathname === "/login" || pathname === "/signup") {
                    Router.push("/");
                } else {
                    setPending(false);
                }
            } else {
                if (pathname === "/login" || pathname === "/signup") {
                    setPending(false);
                } else {
                    Router.push("/login");
                }
            }
        });
        // setPending(false);
        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        const handlePageChangeComplete = () => setPending(false);
        const handlePageChangeStart = () => setPending(true);

        Router.events.on("routeChangeStart", handlePageChangeStart);
        Router.events.on("routeChangeComplete", handlePageChangeComplete);

        return () => {
            Router.events.off("routeChangeStart", handlePageChangeStart);
            Router.events.off("routeChangeComplete", handlePageChangeComplete);
        };
    }, []);

    return { currentUser, setCurrentUser, pending };
};

// export const useAuth = () => {
//     // const [currentUser, setCurrentUser] = useState(null);
//     const [pending, setPending] = useState(true);

//     const { data: session, ...rest } = useSession();

//     console.log({ rest });

//     const pathname = Router.pathname.toLowerCase();

//     if (session) {
//         //@ts-ignore
//         // setCurrentUser(user);

//         if (pathname === "/login" || pathname === "/signup") {
//             Router.push("/");
//         } else {
//             setPending(false);
//         }
//     } else {
//         if (pathname === "/login" || pathname === "/signup") {
//             setPending(false);
//         } else {
//             Router.push("/login");
//         }
//     }

//     return { pending };
// };

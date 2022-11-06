import React, { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "pages/_app";
import Router from "next/router";
import Spinner from "components/spinner";

export const AuthContext = React.createContext({});

export const AuthProvider: React.FC<any> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        (async () => {
            const auth = getAuth(app);
            //@ts-ignore
            await onAuthStateChanged(auth, async (user) => {
                if (user) {
                    //@ts-ignore
                    setCurrentUser(user);
                } else {
                    const pathname = Router.pathname.toLowerCase();
                    if (pathname === "/login" || pathname === "/signup") {
                    } else {
                        Router.replace("/login");
                    }
                }
            });

            setPending(false);
        })();
    }, []);

    if (pending) {
        return <Spinner />;
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// function Loading() {
//     const router = useRouter();

//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const handleStart = (url) => (url !== router.asPath) && setLoading(true);
//         const handleComplete = (url) => (url === router.asPath) && setLoading(false);

//         router.events.on('routeChangeStart', handleStart)
//         router.events.on('routeChangeComplete', handleComplete)
//         router.events.on('routeChangeError', handleComplete)

//         return () => {
//             router.events.off('routeChangeStart', handleStart)
//             router.events.off('routeChangeComplete', handleComplete)
//             router.events.off('routeChangeError', handleComplete)
//         }
//     })

//     return loading && (<div>Loading....{/*I have an animation here*/}</div>);
// }

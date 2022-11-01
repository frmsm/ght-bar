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
        const auth = getAuth(app);
        //@ts-ignore
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //@ts-ignore
                setCurrentUser(user);
            } else {
                const pathname = Router.pathname.toLowerCase();
                if (pathname === "/login" || pathname === "/signup") {
                    setPending(false);
                } else {
                    Router.push("/login");
                }
            }

            setTimeout(() => {
                setPending(false);
            }, 100);
        });
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

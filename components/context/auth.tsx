import React from "react";

import Spinner from "components/spinner";
import { useAuth } from "./hooks/use-auth";

export const AuthContext = React.createContext({});

export const AuthProvider: React.FC<any> = ({ children }) => {
    const { currentUser, setCurrentUser, pending } = useAuth();

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

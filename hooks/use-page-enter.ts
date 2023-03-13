import React, { useEffect, useState } from "react";
import Router from "next/router";

export const usePageEnter = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log({ token });

        if (!token) {
            Router.push("/login");
        }

        if (Router.pathname === "/login") {
            Router.push("/");
        }

        setIsLoading(false);
    }, []);

    return isLoading;
};

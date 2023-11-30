"use client";

import React, { useState } from "react";
// import { useSearchParams } from "next/navigation";

export default function NextPageButton({
    // setQuery,
    // query: queryParams,
    isLoading = false,
    update,
}: {
    setQuery: (value: string) => void;
    query: string;
    isLoading: boolean;
    update: any;
}) {
    // const searchParams = useSearchParams();

    // const page = searchParams.get("page");
    const observerTarget = React.useRef(null);

    // const addMoreItems = React.useCallback(() => {
    //     const current = new URLSearchParams(
    //         queryParams ? queryParams : Array.from(searchParams.entries())
    //     );

    //     const page = current.get("page");

    //     if (Number(page)) {
    //         current.delete("page");
    //         current.set("page", (Number(page) + 1).toString());
    //     } else {
    //         current.set("page", "1");
    //     }

    //     const search = current.toString();
    //     const query = search ? `?${search}` : "";
    //     window.history.pushState({}, "", query ? query : "/");

    //     setQuery(query);
    // }, [queryParams]);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    !isLoading && update();
                }
            },
            { threshold: 0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, isLoading]);

    return (
        <div className="bottom-0 group flex w-full justify-center border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
            {!isLoading ? (
                <p key="ref" ref={observerTarget}>
                    ...
                </p>
            ) : (
                <p key="loading">loading...</p>
            )}
        </div>
    );
}

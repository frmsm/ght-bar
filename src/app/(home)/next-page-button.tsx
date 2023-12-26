"use client";

import { debounce } from "lodash-es";
import React from "react";

export default function NextPageButton({
    isLoading = false,
    update,
}: {
    isLoading: boolean;
    update: any;
}) {
    const observerTarget = React.useRef(null);

    const addMoreItems = debounce(() => {
        const current = new URLSearchParams(window.location.search);
        const page = current.get("page");

        if (Number(page)) {
            current.delete("page");
            current.set("page", (Number(page) + 1).toString());
        } else {
            current.set("page", "1");
        }

        const search = current.toString();

        const query = search ? `?${search}` : "";
        // window.history.pushState({}, "", query ? query : "/");

        window.history.replaceState(
            { ...window.history.state, as: query, url: query },
            "",
            query
        );

        update();
    }, 300);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    !isLoading && addMoreItems();
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
        <div className="bottom-0 group flex w-full justify-center border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
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

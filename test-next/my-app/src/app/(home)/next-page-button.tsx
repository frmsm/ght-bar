"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default function NextPageButton({
    setQuery,
    query: queryParams,
}: {
    setQuery: (value: string) => void;
    query: string;
}) {
    const searchParams = useSearchParams();

    const addMoreItems = () => {
        const current = new URLSearchParams(
            queryParams ? queryParams : Array.from(searchParams.entries())
        );

        const page = current.get("page");

        if (Number(page)) {
            current.delete("page");
            current.set("page", (Number(page) + 1).toString());
        } else {
            current.set("page", "1");
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";
        window.history.pushState({}, "", query ? query : "/");

        setQuery(query);
    };

    return (
        <button
            onClick={addMoreItems}
            type="button"
            className="bottom-0 group flex w-full justify-center border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
            more
        </button>
    );
}

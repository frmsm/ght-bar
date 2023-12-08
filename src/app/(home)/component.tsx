"use client";

import { useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

import type { Item } from "@/models/types";
import { useSearchParams } from "next/navigation";

import Card from "./card";
import Form from "./filter-form";

import WhiskeyComponent from "@/components/whiskey";
import NextPageButton from "./next-page-button";

export const stateKey = "/api/bottles";

async function sendRequest(url: string) {
    const res = await fetch(url);

    if (!res.ok) {
        const error: any = new Error(
            "An error occurred while fetching the data."
        );
        // Attach extra info to the error object.
        error.info = await res.json();
        error.status = res.status;

        throw error;
    }

    return res.json();
}

export default function Component({
    bottles,
    count: initialCount,
}: {
    bottles: Item[];
    count: number;
}) {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 0;

    const [isFilterOpen, setFilterOpen] = useState(false);

    const getKey = (pageIndex: number, previousPageData: string | any[]) => {
        //@ts-ignore
        if (previousPageData && !previousPageData?.items) return null;

        const params = new URLSearchParams(searchParams.toString());

        const page = Number(params.get("page"));
        if (!page || typeof page !== "number") {
            params.set("page", pageIndex.toString());
        } else {
            params.set("page", Number(page + pageIndex).toString());
        }

        return `/api/bottles/v2?${params.toString()}`; // ключ SWR
    };

    //изнаачально неправильно определяется идекс
    const { data, size, setSize, isValidating, isLoading, error } =
        useSWRInfinite(getKey, sendRequest, {
            fallbackData: [{ items: bottles }],
            revalidateOnMount: false,
            revalidateFirstPage: false,
        });

    const b = data ? [].concat(...data.map((it) => it.items)) : [];

    const update = () => setSize(size + 1);

    const count = data && data[0].count ? data[0].count : initialCount;

    return (
        <>
            <div
                className="h-6 justify-center hidden md:flex font-bold"
                onClick={() => setFilterOpen((prev) => !prev)}
            >
                {isFilterOpen ? "Hide filter" : "Show filter"}
            </div>
            <div className="p-4">
                <div
                    className={`truncate ${
                        isFilterOpen ? "md:h-400" : "md:h-0"
                    }`}
                >
                    <Form />
                </div>
            </div>
            <div className="p-8">
                {error ? (
                    <div className="flex flex-col items-center content-around justify-center">
                        <WhiskeyComponent />
                        <h3 className="font-bold">Error</h3>
                    </div>
                ) : (
                    <div className="flex  flex-wrap  gap-8 justify-center">
                        {b?.map((bottle: Item) => {
                            return (
                                <Card key={bottle.id.toString()} {...bottle} />
                            );
                        })}
                    </div>
                )}
            </div>
            {count > b.length && ((data?.length || 0) + 1) * 20 < count ? (
                <NextPageButton
                    isLoading={isLoading || isValidating}
                    update={update}
                />
            ) : null}
        </>
    );
}

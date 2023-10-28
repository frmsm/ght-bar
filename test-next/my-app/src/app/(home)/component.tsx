"use client";

import { useState } from "react";
import useSWR from "swr";

import type { Item } from "@/models/types";

import Card from "./card";
import Form from "./filter-form";

import WhiskeyComponent from "@/components/whiskey";
import NextPageButton from "./next-page-button";

export const stateKey = "/api/bottles";

async function sendRequest([url, queryParams = ""]: [string, string]) {
    const res = await fetch(`${url}${queryParams}`);

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

export default function Component({ bottles }: { bottles: Item[] }) {
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [queryParams, setQueryParams] = useState("");
    const { data, error } = useSWR([stateKey, queryParams], sendRequest, {
        fallbackData: bottles,
        revalidateOnMount: false,
    });

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
                    <Form setQuery={setQueryParams} />
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
                        {data?.map((bottle: Item) => {
                            return (
                                <Card key={bottle.id.toString()} {...bottle} />
                            );
                        })}
                    </div>
                )}
            </div>
            <NextPageButton setQuery={setQueryParams} query={queryParams} />
        </>
    );
}

import React from "react";
import ReactCountryFlag from "react-country-flag";

import Link from "next/link";

import type { Item } from "@/models/types";

import { COUNTRY } from "./constants";

export default function Footer({
    name,
    notes,
    strength,
    user,
    countryOrigin,
}: {
    name: Item["name"];
    notes: Item["notes"];
    strength: Item["strength"];
    user: Item["user"];
    countryOrigin: Item["countryOrigin"];
}) {
    return (
        <>
            <h5 className="mb-1 text-xl font-medium text-gray-900 ">{name}</h5>
            <ul className="flex flex-col items-center pb-10">
                <li className="text-sm text-gray-500 ">
                    <Link href={`/?strength=${strength}`}>{strength} %</Link>
                </li>
                <li className="text-sm text-gray-500 ">
                    <Link href={`/?countryOrigin=${countryOrigin}`}>
                        {countryOrigin}{" "}
                        <ReactCountryFlag
                            countryCode={
                                //@ts-ignore
                                COUNTRY[countryOrigin] ?? ""
                            }
                        />
                    </Link>
                </li>
                <li className="text-sm text-gray-500 ">
                    <Link href={`/?user=${user}`}>{user}</Link>
                </li>
                <li className="text-sm text-gray-500 ">{notes}</li>
            </ul>
            {/* <div className="flex mt-4 space-x-3 md:mt-6">
                    <a
                        href="#"
                        className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                        Add friend
                    </a>
                    <a
                        href="#"
                        className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                        Message
                    </a>
                </div> */}
        </>
    );
}

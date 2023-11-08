"use client";

import React, { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type { Item } from "@/models/types";

export default function Header({ id }: { id: Item["id"] }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const toggleSettings = () => setIsSettingsOpen((prev) => !prev);
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="flex justify-end px-4 pt-4">
            <button
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
                data-dropdown-toggle="dropdown"
                id="dropdownButton"
                type="button"
                onMouseDown={toggleSettings}
            >
                <span className="sr-only">Open dropdown</span>
                <svg
                    aria-hidden="true"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
            </button>
            {
                //@ts-ignore
                session && session?.user?.isAdmin && (
                    <div
                        className={`${
                            !isSettingsOpen ? "hidden" : ""
                        } absolute right-16 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow `}
                        id="dropdown"
                    >
                        <ul aria-labelledby="dropdownButton" className="py-1">
                            <li>
                                <a
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                    href={`/admin/${id}`}
                                >
                                    Edit
                                </a>
                            </li>

                            <li>
                                <a
                                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 "
                                    href="#"
                                    onMouseUp={async (e) => {
                                        e.preventDefault();

                                        const isDelete = confirm(
                                            "Ты что, собрался удалить эту хрень?"
                                        );

                                        if (isDelete) {
                                            try {
                                                await fetch(
                                                    `/api/bottles/${id}`,
                                                    {
                                                        method: "DELETE",
                                                    }
                                                );

                                                router.push("/");
                                            } catch {
                                                console.error("error");
                                            }
                                        }
                                    }}
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

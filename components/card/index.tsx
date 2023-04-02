import React from "react";
import Image from "next/image";
import Whiskey from "components/svg/whiskey.svg";
import { NextPage } from "next";
import type { Item } from "pages";
import dayjs from "dayjs";
import Link from "next/link";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

const Card: NextPage<Item> = ({
    image,
    name,
    notes,
    strength,
    user,
    countryOrigin,
    createdAt,
}) => {
    return (
        <div
            style={{ minWidth: "296px" }}
            className="w-full max-w-sm min-w-fit bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
            <div className="flex justify-end px-4 pt-4">
                <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdown"
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                </button>
                <div
                    id="dropdown"
                    className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                >
                    <ul className="py-1" aria-labelledby="dropdownButton">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Edit
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Export Data
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10 gap-2">
                {/* <Whiskey className="w-20" /> */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {dayjs(createdAt).format("DD.MM.YYYY")}
                </div>
                <div>
                    {image ? (
                        <Image
                            // loader={imgLoader}
                            // src={`http://ght.bar/static/images/${image}`}
                            src={`/images/${image}`}
                            alt={name}
                            width={200}
                            height={200}
                            loading="lazy"
                            quality={30}
                            placeholder="empty"
                            className="rounded-full shadow-lg brightness-110"
                            // layout="responsive"
                            // priority={false}
                        />
                    ) : (
                        <Whiskey className="w-20" />
                    )}
                    {/* {image && <Whiskey className="w-20" />} */}
                </div>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {name}
                </h5>
                <ul className="flex flex-col items-center pb-10">
                    <li className="text-sm text-gray-500 dark:text-gray-400">
                        <Link href={`/?strength=${strength}`}>
                            {strength} %
                        </Link>
                    </li>

                    <li className="text-sm text-gray-500 dark:text-gray-400">
                        <Link href={`/?country=${countryOrigin}`}>
                            {countryOrigin} {getUnicodeFlagIcon(countryOrigin)}
                        </Link>
                    </li>
                    <li className="text-sm text-gray-500 dark:text-gray-400">
                        <Link href={`/?user=${user}`}>{user}</Link>
                    </li>
                    <li className="text-sm text-gray-500 dark:text-gray-400">
                        {notes}
                    </li>
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
            </div>
        </div>
    );
};

export default Card;

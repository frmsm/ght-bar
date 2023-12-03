import React from "react";

import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import SignOutButton from "./sign-out-button";
import SignButton from "./sign-button";

export default async function Header() {
    const session = await getServerSession(authOptions);

    return (
        <header className="sticky top-0 w-full z-50">
            <div>
                <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 mb-3">
                    <div className="container px-4 mx-auto flex flex-row flex-wrap items-center justify-between">
                        <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                            <Link
                                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                                href="/"
                            >
                                Борматухи GHT
                            </Link>
                        </div>
                        <div
                            className={"flex-row items-center" + "flex"}
                            id="example-navbar-danger"
                        >
                            <ul
                                className="flex
                            flex-row list-none lg:ml-auto"
                            >
                                {/* <li className="nav-item">
                                    <a
                                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                        href="#pablo"
                                    >
                                        <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                                        <span className="ml-2">Share</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                        href="#pablo"
                                    >
                                        <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                                        <span className="ml-2">Tweet</span>
                                    </a>
                                </li> */}
                                {!session && <SignButton />}
                                {session && (
                                    <>
                                        {
                                            //@ts-ignore TODO изменить тип
                                            session?.user?.isAdmin && (
                                                <li className="nav-item cursor-pointer">
                                                    <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                                        <Link
                                                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                            href={`/admin`}
                                                        >
                                                            <>
                                                                <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                                                                <span className="ml-2">
                                                                    Admin
                                                                </span>
                                                            </>
                                                        </Link>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        {/* <li className="nav-item cursor-pointer">
                                            <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                                <Link
                                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                    href={`/profile/${session?.user?.username}`}
                                                >
                                                    <>
                                                        <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                                                        <span className="ml-2">
                                                            Profile
                                                        </span>
                                                    </>
                                                </Link>
                                            </div>
                                        </li> */}
                                        <li className="nav-item">
                                            <SignOutButton />
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

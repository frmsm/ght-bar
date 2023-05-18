import React, { useContext } from "react";
import Router from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import { NextAuthContext } from "components/context/next-auth";

const Header = () => {
    const onSignOut = async () => {
        try {
            await signOut();

            Router.reload();
        } catch (e) {}
    };

    const { session } = useContext(NextAuthContext) as any;

    return (
        <header>
            <div>
                <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 mb-3">
                    <div className="container px-4 mx-auto flex flex-row flex-wrap items-center justify-between">
                        <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                            <Link
                                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                                href="/"
                            >
                                GHT-BAR
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
                                {!session && (
                                    <li className="nav-item cursor-pointer">
                                        <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                            <Link
                                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                href="/signup"
                                            >
                                                <>
                                                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                                                    <span className="ml-2">
                                                        Sign Up
                                                    </span>
                                                </>
                                            </Link>
                                        </div>
                                    </li>
                                )}
                                {session && (
                                    <>
                                        {session?.user?.isAdmin && (
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
                                        )}
                                        <li className="nav-item cursor-pointer">
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
                                        </li>
                                        <li className="nav-item">
                                            <div className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                                <a
                                                    onMouseUp={onSignOut}
                                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                    // href="/"
                                                >
                                                    <>
                                                        <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                                                        <span className="ml-2">
                                                            LogOut
                                                        </span>
                                                    </>
                                                </a>
                                            </div>
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
};

export default Header;

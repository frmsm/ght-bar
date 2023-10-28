"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignButton() {
    const pathname = usePathname();

    return (
        <li className="nav-item cursor-pointer">
            <div className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href={pathname === "/signup" ? "/login" : "signup"}
                >
                    <>
                        <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                        <span className="ml-2">
                            {pathname === "/signup" ? "Sign In" : "Sign Up"}
                        </span>
                    </>
                </Link>
            </div>
        </li>
    );
}

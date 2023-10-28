"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    const onSignOut = async () => {
        try {
            await signOut();

            router.refresh();
        } catch (e) {}
    };

    return (
        <div className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
            <a
                onMouseUp={onSignOut}
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            >
                <>
                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">LogOut</span>
                </>
            </a>
        </div>
    );
}

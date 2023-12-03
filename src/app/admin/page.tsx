import React from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import Form from "./form";

export default async function Admin() {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.isAdmin) {
        redirect("/");
    }

    return (
        <div className="flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Add борматуха page
                    </h2>
                </div>
                <Form />
            </div>
        </div>
    );
}

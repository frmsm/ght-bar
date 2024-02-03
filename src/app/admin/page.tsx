import React from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions, prisma } from "@/lib/auth";

import Form from "./form";

export default async function Admin() {
    const session = await getServerSession(authOptions);

    const users = await prisma.users.findMany({ select: { username: true } });
    const usersArray = users
        ?.map((user) => user.username)
        ?.filter((user) => user !== "admin");

    const types = await prisma.types.findMany({ select: { type: true } });
    const typesArray = types?.map((type) => type.type);

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
                <Form users={usersArray} types={typesArray} />
            </div>
        </div>
    );
}

import React from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions, prisma } from "@/lib/auth";

import Form from "../form";
import ImageComponent from "@/app/(home)/card/image";

export default async function Admin({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.isAdmin) {
        redirect("/");
    }

    const bottle = await prisma.items.findFirst({
        where: {
            id: Number(params.id),
        },
    });

    const users = await prisma.users.findMany({ select: { username: true } });
    const usersArray = users
        ?.map((user) => user.username)
        ?.filter((user) => user !== "admin");

    const types = await prisma.types.findMany({ select: { type: true } });
    const typesArray = types?.map((type) => type.type);

    return (
        <div className="flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Edit миньон page
                    </h2>
                </div>
                {bottle?.image && (
                    <div className="flex justify-center">
                        <ImageComponent
                            image={bottle?.image}
                            name={bottle?.name || ""}
                        />
                    </div>
                )}
                <Form item={bottle} users={usersArray} types={typesArray} />
            </div>
        </div>
    );
}

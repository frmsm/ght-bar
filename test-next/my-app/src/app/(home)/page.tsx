import { cache } from "react";
import styles from "./Home.module.css";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Component from "./component";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/auth";

// export const metadata: Metadata = {
//     title: "Main",
//     description: "new main",
// };

const getBottles = cache(async (searchParams: any) => {
    console.info("get bottles request from server component");

    const strength = searchParams.strength;
    const name = searchParams.name;
    const countryOrigin = searchParams.countryOrigin;
    const user = searchParams.user;
    const page = Number(searchParams.page || 0);

    let take = 20;

    if (page) {
        take = (page + 1) * 20;
    }

    return await prisma?.items.findMany({
        where: {
            ...(strength ? { strength: Number(strength) } : {}),
            ...(name ? { name: { contains: name } } : {}),
            ...(countryOrigin
                ? { countryOrigin: { contains: countryOrigin } }
                : {}),
            ...(user ? { user: { contains: user } } : {}),
        },
        take,
    });
});

export default async function Home({ searchParams }: any) {
    const session = await getServerSession(authOptions);
    console.log("rerender");
    if (!session) {
        redirect("/login");
    }

    const bottles: any = await getBottles(searchParams);

    return (
        <div className={styles.container}>
            <Component bottles={bottles} />
        </div>
    );
}

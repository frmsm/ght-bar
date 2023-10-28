import { prisma } from "@/lib/auth";

export const getBottles = async (searchParams: any) => {
    console.info("get bottles request from server component");

    const strength = searchParams.strength;
    const name = searchParams.name;
    const countryOrigin = searchParams.countryOrigin;
    const user = searchParams.user;
    // const page = Number(searchParams.get("page") || 0);
    // const page = searchParams.get("page") || 0;

    // let take = 20;

    // if (page) {
    //     take = (page + 1) * 20;
    // }

    return await prisma?.items.findMany({
        where: {
            ...(strength ? { strength: Number(strength) } : {}),
            ...(name ? { name: { contains: name } } : {}),
            ...(countryOrigin
                ? { countryOrigin: { contains: countryOrigin } }
                : {}),
            ...(user ? { user: { contains: user } } : {}),
        },
        take: 20,
    });
};

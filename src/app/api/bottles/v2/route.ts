import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth";

const handler = async (req: NextRequest) => {
    console.info("get bottles request from client component");

    const { searchParams } = new URL(req.url);

    const strength = searchParams.get("strength") || null;
    const name = searchParams.get("name");
    const countryOrigin = searchParams.get("countryOrigin") || "";
    const user = searchParams.get("user") || "";
    const page = Number(searchParams.get("page") || 0);

    const bottlesCount = await prisma.items.count();

    const bottles = await prisma.items.findMany({
        where: {
            ...(strength ? { strength: Number(strength) } : {}),
            ...(name ? { name: { contains: name } } : {}),
            ...(countryOrigin
                ? { countryOrigin: { contains: countryOrigin } }
                : {}),
            ...(user ? { user: { contains: user } } : {}),
        },
        skip: page * 20,
        take: 20,
    });

    const result = {
        count: bottlesCount,
        items: bottles,
    };

    return NextResponse.json(result.items, {
        status: 200,
    });
};

export { handler as GET };

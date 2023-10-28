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

    let take = 20;

    if (page) {
        take = (page + 1) * 20;
    }

    const result = await prisma.items.findMany({
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

    return NextResponse.json(result, {
        status: 200,
    });
};

export { handler as GET };

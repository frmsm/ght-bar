import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const sessionCheck = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
        return NextResponse.json(
            {
                message: `Please login`,
            },
            {
                status: 401,
            }
        );
    }
};

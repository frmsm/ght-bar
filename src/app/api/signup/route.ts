import bCrypt from "bcrypt";

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/auth";

const handler = async (req: NextRequest) => {
    const formData = await req.formData();

    const mail = formData.get("email") as string;
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    const hasEmail = Boolean(
        mail &&
            (await prisma.users.findFirst({
                where: {
                    mail: mail,
                },
            }))
    );

    const hasLogin = Boolean(
        login &&
            (await prisma.users.findFirst({
                where: {
                    username: login,
                },
            }))
    );

    if (!(hasLogin || hasEmail)) {
        try {
            await prisma.users.create({
                data: {
                    username: login,
                    mail: mail,
                    password: bCrypt.hashSync(password, bCrypt.genSaltSync(8)),
                    isAdmin: false,
                },
            });

            return NextResponse.json(
                {
                    message: `User ${login} has created`,
                },
                {
                    status: 200,
                }
            );
        } catch (e) {
            console.error(e);
        }
    }

    return NextResponse.json(
        {
            message: `Cant create user ${login}`,
        },
        {
            status: 400,
        }
    );
};

export { handler as POST };

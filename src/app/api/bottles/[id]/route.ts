import { prisma } from "@/lib/auth";

import { writeFile } from "fs/promises";
import path from "path";

import { NextResponse, type NextRequest } from "next/server";

import { sessionCheck } from "../../session-check";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

const handler = async (req: NextRequest) => {
    try {
        await sessionCheck();

        const id = req.url.split("/").reverse()[0];

        const bottle = await prisma.items.findFirst({
            where: {
                id: Number(id),
            },
        });

        if (req.method === "DELETE") {
            try {
                if (bottle) {
                    await prisma.items.delete({
                        where: { id: Number(id) },
                    });
                }

                return NextResponse.json(
                    {
                        message: `Ittem ${id} has deleted`,
                    },
                    {
                        status: 200,
                    }
                );
            } catch (e) {
                return NextResponse.json(
                    {
                        message: `Server error`,
                    },
                    {
                        status: 500,
                    }
                );
            }
        }
        if (req.method === "PUT") {
            const uploadDir = path.join(process.cwd(), "/public/images");

            const data = await req.formData();

            const name = data.get("name") as string;
            const type = data.get("type") as string;
            const strength = data.get("strength") as string;
            const countryOrigin = data.get("countryOrigin") as string;
            const user = data.get("user") as string;
            const file: File | null = data.get("image") as unknown as File;

            if (file) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                await writeFile(`${uploadDir}/${file.name}`, buffer);
            }

            await prisma.items.update({
                where: {
                    id: Number(id),
                },

                data: {
                    name,
                    countryOrigin,
                    user,
                    type,
                    strength: Number(strength),
                    //@ts-ignore
                    image: file?.name ?? bottle.image,
                },
            });

            return NextResponse.json(
                {
                    message: `Item has created`,
                },
                {
                    status: 200,
                }
            );
        }
    } catch (e) {
        console.log(e);
    }

    return NextResponse.json(
        {
            message: `Cant create item`,
        },
        {
            status: 400,
        }
    );
};

export { handler as PUT, handler as DELETE };

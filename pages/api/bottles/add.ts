import { prisma } from "../auth/[...nextauth]";

import formidable from "formidable";
import fs from "fs";
import { IncomingMessage } from "http";
import path from "path";
import { getSession } from "next-auth/react";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: IncomingMessage,
    res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            json: { (arg0: { message?: string }): any; new (): any };
        };
    }
) {
    try {
        //@ts-ignore
        const session = await getSession({ req });

        //@ts-ignore
        if (!session?.user?.isAdmin) {
            throw new Error("Current user is not admin");
        }

        const uploadDir = path.join(process.cwd(), "/public/images");
        const form = new formidable.IncomingForm({
            uploadDir, // don't forget the __dirname here
            keepExtensions: true,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                throw new Error("400 code");
            }

            await prisma.items.create({
                //@ts-ignore
                data: {
                    ...fields,
                    strength: Number(fields.strength),
                    //@ts-ignore
                    image: files?.image?.newFilename ?? "",
                },
            });

            return res.status(200).json({});
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error" });
    }
}

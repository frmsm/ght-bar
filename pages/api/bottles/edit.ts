//@ts-nocheck
import { prisma } from "../auth/[...nextauth]";

import formidable from "formidable";
import fs from "fs";
import path from "path";
import isEmpty from "lodash-es/isEmpty";
import { IncomingMessage } from "http";

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
    // const data = await JSON.parse(req.body);

    // const uploadDir = path.resolve(__dirname, "../../img");
    const uploadDir = path.join(process.cwd(), "/public/images");
    const form = new formidable.IncomingForm({
        uploadDir, // don't forget the __dirname here
        keepExtensions: true,
    });

    // form.uploadDir = "./";
    // form.keepExtensions = true;
    try {
        form.parse(req, async (err, fields, files) => {
            const item = await prisma.items.findFirst({
                where: {
                    id: Number(fields.id),
                },
            });

            const result = await prisma.items.update({
                where: {
                    id: Number(fields.id),
                },

                data: {
                    name: fields.name,
                    type: fields.type,
                    countryOrigin: fields.countryOrigin,
                    notes: fields.notes,
                    user: fields.user,
                    strength: Number(fields.strength),
                    image: !isEmpty(files) ? files?.image?.newFilename : null,
                },
            });

            return res.status(200).json(result);
        });
    } catch (e) {
        console.error(e);
        return res.status(200).json({ message: "error" });
    }
}

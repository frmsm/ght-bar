import { prisma } from "../auth/[...nextauth]";

// import formidable from "formidable";
// import fs from "fs";
// import path from "path";
// import isEmpty from "lodash-es/isEmpty";
import { IncomingMessage } from "http";

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
    const { id } = req.query;

    if (req.method === "DELETE") {
        try {
            const item = await prisma.items.findUnique({
                where: {
                    id: Number(id),
                },
            });

            let result = null;
            if (item) {
                result = await prisma.items.delete({
                    where: { id: Number(id) },
                });
            }

            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({ message: "error" });
        }
    }

    // if (req.method === "PUT") {
    //     const uploadDir = path.join(process.cwd(), "/public/images");
    //     const form = new formidable.IncomingForm({
    //         uploadDir, // don't forget the __dirname here
    //         keepExtensions: true,
    //     });

    //     // console.log(req.method, id);
    //     // form.uploadDir = "./";
    //     // form.keepExtensions = true;
    //     // try {
    //     form.parse(req, async (err, fields, files) => {
    //         console.log("test", { id });

    //         const item = await prisma.items.findFirst({
    //             where: {
    //                 id: Number(id),
    //             },
    //         });

    //         console.log({ item });

    //         if (!item) {
    //             throw new Error("no data");
    //         }

    //         const result = await prisma.items.update({
    //             where: {
    //                 id: Number(id),
    //             },

    //             data: {
    //                 name: fields.name,
    //                 type: fields.type,
    //                 countryOrigin: fields.countryOrigin,
    //                 notes: fields.notes,
    //                 user: fields.user,
    //                 strength: Number(fields.strength),
    //                 image: !isEmpty(files) ? files?.image?.newFilename : null,
    //             },
    //         });

    //         return res.status(200).json(result);
    //     });
    //     // } catch (e) {
    //     //     console.log(e);
    //     //     return res.status(500).json({ message: "error" });
    //     // }
    // }
}

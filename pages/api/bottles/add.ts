import { prisma } from "./auth/[...nextauth]";

import formidable from "formidable";
import fs from "fs";
import { IncomingMessage } from "http";
import path from "path";

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
    console.log(req.body);
    // const uploadDir = path.resolve(__dirname, "../../img");
    const uploadDir = path.join(process.cwd(), "/public/images");
    const form = new formidable.IncomingForm({
        uploadDir, // don't forget the __dirname here
        keepExtensions: true,
    });
    // form.uploadDir = "./";
    // form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        console.log({ err, fields, files });

        await prisma.items.create({
            //@ts-ignore
            data: {
                ...fields,
                strength: Number(fields.strength),
                image: files.image.newFilename,
            },
        });

        // let oldPath = files.image.filepath;
        // let newPath =
        //     path.join(__dirname) +
        //     "/" +
        //     fields.name +
        //     "." +
        //     files.image.originalFilename.split(".").reverse()[0];
        // let rawData = fs.readFileSync(oldPath);

        // fs.writeFile(newPath, rawData, function (err) {
        //     if (err) console.log(err);
        //     return res.send("Successfully uploaded");
        // });
    });
    // .on("file", function (field, file) {
    //     console.log({ field });
    //     fs.rename(
    //         file.filepath,
    //         form.uploadDir + "/" + file.originalFilename,
    //         (error) => console.log(error)
    //     );
    // });
    try {
        // await prisma.items.create({
        //     //@ts-ignore
        //     data: {
        //         ...data,
        //         strength: Number(data.strength),
        //     },
        // });
        // if
        return res.status(200).json({});
    } catch (e) {
        console.log(e);
        return res.status(200).json({ message: "error" });
    }
}

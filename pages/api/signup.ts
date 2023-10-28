import { prisma } from "./auth/[...nextauth]";
import bCrypt from "bcrypt-nodejs";

//@ts-ignore
export default async function handler(req, res) {
    const hasEmail = await prisma.users.findFirst({
        where: {
            mail: req.body.email,
        },
    });

    const hasLogin = await prisma.users.findFirst({
        where: {
            username: req.body.login,
        },
    });

    if (!(hasLogin || hasEmail)) {
        try {
            await prisma.users.create({
                //@ts-ignore
                data: {
                    username: req.body.login as string,
                    mail: req.body.email as string,
                    password: bCrypt.hashSync(
                        req.body.password,
                        bCrypt.genSaltSync(8)
                    ),
                    isAdmin: false,
                },
            });

            res.writeHead(301, {
                Location: `/login`,
            }).end();
        } catch (e) {
            console.log(e);
        }
    }
}

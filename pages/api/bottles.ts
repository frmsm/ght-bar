import { prisma } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    let o = Object.fromEntries(Object.entries(req.query).filter(([_, v]) => v));

    if (o.strength) {
        o.strength = Number(o.strength);
    }

    const result = await prisma.items.findMany({
        where: {
            ...o,
            name: {
                //@ts-ignore
                contains: o?.name ?? "",
            },
        },
    });

    res.status(200).json(result);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "lib/db";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const result = await executeQuery(queryGetAll());
    res.status(200).json(JSON.parse(JSON.stringify(result)));
}

const queryGetAll = () => ({
    query: "SELECT * FROM ght_bar.items",
    values: [],
});

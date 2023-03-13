import React, { useContext } from "react";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "components/context/auth";
import { GetServerSidePropsContext } from "next";
import { prisma } from "pages/api/auth/[...nextauth]";

const Profile: NextPage<{ user: any }> = ({
        user,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // const [user, setUser] = useState<any>({});
    // const ctx = useContext(AuthContext) as any;
    // const uid = ctx.currentUser.displayName;

    // const db = getDatabase();

    // useEffect(() => {
    //     (async () => {
    //         const dataRef = ref(db, `users/${uid}`);
    //         onValue(dataRef, (snapshot) => {
    //             try {
    //                 const user = snapshot.val();

    //                 setUser(user);
    //             } catch {
    //                 alert("no user");
    //             }
    //         });
    //     })();
    // }, [db, uid]);

    return <div>{JSON.stringify(user)}</div>;
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // const allUsers = await prisma.users.findMany();
    // console.log(allUsers);

    let user = {};

    let o = Object.fromEntries(
        Object.entries(context.query).filter(([_, v]) => v)
    );

    if (o.strength) {
        //@ts-ignore
        o.strength = Number(o.strength);
    }

    try {
        // const result = await executeQuery(getQuery(query));

        // bottles = JSON.parse(JSON.stringify(result));
        const result = await prisma.items.findMany({
            where: {
                ...o,
                name: {
                    //@ts-ignore
                    contains: o?.name ?? "",
                },
            },
        });

        user = JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log("sql connection error", error);
    }

    return {
        props: { user }, // will be passed to the page component as props
    };
}

import React, { useState } from "react";
import type { NextPage, InferGetServerSidePropsType } from "next";

import { GetServerSidePropsContext } from "next";
import { authOptions, prisma } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
// import { authOptions } from '../api/auth/[...nextauth]'
import { useSession, signIn, signOut } from "next-auth/react";
import Input from "components/input";
import { useForm } from "react-hook-form";
import { Router } from "next/router";
import { useRouter } from "next/router";

const Admin: NextPage = (props) => {
    const { data: session } = useSession();
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<any>({ mode: "onChange" });

    //@ts-ignore
    if (!session || !session?.user?.isAdmin) {
        router.push("/");
    }

    const onSubmit = async (values: any) => {
        setIsloading(true);
        try {
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("type", values.type);
            formData.append("strength", values.strength);
            formData.append("countryOrigin", values.countryOrigin);
            formData.append("user", values.user);
            if (values.image) {
                formData.append("image", values.image[0]);
            }

            await fetch("/api/bottles/add", {
                method: "POST",
                body: formData,
                // headers: {
                //     Accept: "application/json, application/xml, text/plain, text/html, *.*",
                //     "Content-Type": "multipart/form-data",
                // },
            });

            // router.push("/");
        } catch (err) {
            console.log(err);
        }
        setIsloading(false);
    };

    return (
        <div className="flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Admin page
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    //@ts-ignore
                    // onSubmit={handleSignUp}
                    // action="/api/add-item"
                    // method="post"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <Input
                            label="Name"
                            id="name"
                            type="text"
                            // name="name"
                            placeholder="Name"
                            required
                            {...register("name")}
                        />
                        <Input
                            label="Type"
                            // id="type"
                            type="text"
                            // name="type"
                            placeholder="Type"
                            required
                            {...register("type")}
                        />
                        <Input
                            label="Strength"
                            id="strength"
                            type="text"
                            // name="strength"
                            placeholder="Strength"
                            required
                            {...register("strength")}
                        />
                        <Input
                            label="Country"
                            id="countryOrigin"
                            type="text"
                            // name="countryOrigin"
                            placeholder="Country"
                            required
                            {...register("countryOrigin")}
                        />
                        <Input
                            label="User"
                            id="user"
                            type="text"
                            // name="countryOrigin"
                            placeholder="User"
                            required
                            {...register("user")}
                        />
                        <Input
                            accept="image/*"
                            label="Image"
                            id="image"
                            type="file"
                            // name="image"
                            placeholder="Image"
                            {...register("image")}
                        />
                    </div>
                    {!isLoading && (
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                Add item
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Admin;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     // const allUsers = await prisma.users.findMany();
//     // console.log(allUsers);

//     // const session = await getServerSession(
//     //     context.req,
//     //     context.res,
//     //     authOptions
//     // );

//     // console.log(session);

//     // let user = {};

//     // let o = Object.fromEntries(
//     //     Object.entries(context.query).filter(([_, v]) => v)
//     // );

//     // if (o.strength) {
//     //     //@ts-ignore
//     //     o.strength = Number(o.strength);
//     // }

//     // try {
//     //     // const result = await executeQuery(getQuery(query));

//     //     // bottles = JSON.parse(JSON.stringify(result));
//     //     const result = await prisma.items.findMany({
//     //         where: {
//     //             ...o,
//     //             name: {
//     //                 //@ts-ignore
//     //                 contains: o?.name ?? "",
//     //             },
//     //         },
//     //     });

//     //     user = JSON.parse(JSON.stringify(result));
//     // } catch (error) {
//     //     console.log("sql connection error", error);
//     // }

//     return {
//         props: { user: {} }, // will be passed to the page component as props
//     };
// }

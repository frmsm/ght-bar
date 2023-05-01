import React, { useContext } from "react";
import type { NextPage, InferGetServerSidePropsType } from "next";

import { useState } from "react";

import { GetServerSidePropsContext } from "next";
import { authOptions, prisma } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { useSession, signIn, signOut } from "next-auth/react";
import Input from "components/input";
import { useForm } from "react-hook-form";

type Bottle = any;

const EditBottle: NextPage<{ bottle: Bottle }> = ({
    bottle,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: session } = useSession();
    const [isLoading, setIsloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<any>({ defaultValues: bottle, mode: "onChange" });

    //@ts-ignore
    if (!session || !session?.user?.isAdmin) {
        console.log("not admin");
    }

    const onSubmit = async (values: any) => {
        setIsloading(true);

        try {
            const formData = new FormData();

            formData.append("id", values.id);
            formData.append("name", values.name);
            formData.append("type", values.type);
            formData.append("strength", values.strength);
            formData.append("countryOrigin", values.countryOrigin);
            formData.append("user", values.user);
            if (values.image) {
                formData.append("image", values.image[0]);
            }

            await fetch("/api/bottles/edit", {
                method: "PUT",
                body: formData,
                // headers: {
                //     Accept: "application/json, application/xml, text/plain, text/html, *.*",
                //     "Content-Type": "multipart/form-data",
                // },
            });
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
                            placeholder="name"
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

export default EditBottle;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let bottle = null;

    try {
        const result = await prisma.items.findUnique({
            where: {
                id: Number(context.query.id),
            },
        });

        bottle = JSON.parse(JSON.stringify(result));
    } catch {
        bottle = {};
    }

    return {
        props: { bottle }, // will be passed to the page component as props
    };
}

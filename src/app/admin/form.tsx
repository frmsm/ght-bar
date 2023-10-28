"use client";
import React from "react";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Item } from "@/models/types";

async function sendRequest(url: string, { arg }: { arg: FormData }) {
    const res = await fetch(url, {
        method: "POST",
        body: arg,
    });

    if (!res.ok) {
        const error: any = new Error(
            "An error occurred while fetching the data."
        );
        // Attach extra info to the error object.
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

async function sendPutRequest(url: string, { arg }: { arg: FormData }) {
    const res = await fetch(url, {
        method: "PUT",
        body: arg,
    });

    if (!res.ok) {
        const error: any = new Error(
            "An error occurred while fetching the data."
        );
        // Attach extra info to the error object.
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

const CreateBottleSchema = z.object({
    name: z.string().trim(),
    type: z.string().trim(),
    strength: z.string().or(z.number()),
    countryOrigin: z.string(),
    user: z.string(),
    image: z.instanceof(FileList).or(z.string()).optional().nullable(),
});

type CreateBottleSchemaType = z.infer<typeof CreateBottleSchema>;

export default function Form({ item = null }: { item: null | Item }) {
    const { trigger, isMutating, error } = useSWRMutation(
        !item ? "/api/bottles/add" : `/api/bottles/${item.id}`,
        !item ? sendRequest : sendPutRequest /* опции */
    );

    const router = useRouter();

    const defaultValues = item ? { ...item, image: null } : {};
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateBottleSchemaType>({
        resolver: zodResolver(CreateBottleSchema),
        mode: "onChange",
        defaultValues,
    });

    const onSubmit = async (values: any) => {
        try {
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("type", values.type);
            formData.append("strength", values.strength);
            formData.append("countryOrigin", values.countryOrigin);
            formData.append("user", values.user);

            if (values.image && values.image.length > 0) {
                let newImage = values.image[0];

                if (values.image[0].type === "image/heic") {
                    const heic2any = (await import("heic2any")).default;

                    newImage = await heic2any({ blob: values.image[0] });
                }

                formData.append("image", newImage);
            }

            await trigger(formData);

            router.push(`/?name=${values.name}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center text-rose-400">
                <div>{error && error.info ? error.info.message : null}</div>
            </div>
            <div className=" rounded-md shadow-sm">
                <Input
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                    {...register("name")}
                    error={errors.name?.message}
                />
                <Input
                    label="Type"
                    id="type"
                    type="text"
                    placeholder="Type"
                    required
                    {...register("type")}
                    error={errors.type?.message}
                />
                <Input
                    label="Strength"
                    id="strength"
                    type="number"
                    type="text"
                    placeholder="Strength"
                    required
                    {...register("strength")}
                    error={errors.strength?.message}
                />
                <Input
                    label="Country"
                    id="countryOrigin"
                    type="text"
                    placeholder="Country"
                    required
                    {...register("countryOrigin")}
                    error={errors.countryOrigin?.message}
                />
                <Input
                    label="User"
                    id="user"
                    type="text"
                    placeholder="User"
                    required
                    {...register("user")}
                    error={errors.user?.message}
                />
                <Input
                    accept="image/*, .heic"
                    label="Image"
                    id="image"
                    type="file"
                    placeholder="Image"
                    {...register("image")}
                    error={errors.image?.message}
                />
            </div>
            {!isMutating && (
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
    );
}

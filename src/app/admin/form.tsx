"use client";
import React from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import ReactCountryFlag from "react-country-flag";

import Input from "@/components/input";
import Spinner from "@/components/spinner";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Item } from "@/models/types";
import { COUNTRY } from "../(home)/card/constants";

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
    image: z.any().or(z.string()).optional().nullable(),
});

type CreateBottleSchemaType = z.infer<typeof CreateBottleSchema>;

export default function Form({ item = null }: { item?: null | Item | any }) {
    const defaultValues = item ? { ...item, image: null } : {};
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateBottleSchemaType>({
        resolver: zodResolver(CreateBottleSchema),
        mode: "onChange",
        defaultValues,
    });

    const {
        trigger,
        isMutating,
        error,
        reset: resetMutation,
    } = useSWRMutation(
        !item ? "/api/bottles/add" : `/api/bottles/${item.id}`,
        !item ? sendRequest : sendPutRequest
    );

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

            toast.success("Ты только что добавил еще одну бутылку бормотухи");
            resetMutation();
            !item && reset();
        } catch (err) {
            console.error(err);

            toast.error(JSON.stringify(err) || "Ошибка");
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center text-rose-400">
                <div>{error && error.info ? error.info.message : null}</div>
            </div>
            <div className=" rounded-md shadow-sm">
                <Input
                    id="name"
                    label="Name"
                    placeholder="Name"
                    type="text"
                    required
                    {...register("name")}
                    error={errors.name?.message}
                />
                <Input
                    id="type"
                    label="Type"
                    placeholder="Type"
                    type="text"
                    required
                    {...register("type")}
                    error={errors.type?.message}
                />
                <Input
                    id="strength"
                    label="Strength"
                    placeholder="Strength"
                    type="number"
                    required
                    {...register("strength")}
                    error={errors.strength?.message}
                />

                <select
                    className="mb-4 relative block w-full  appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                    id="origin"
                    {...register("countryOrigin")}
                    // onError={errors.countryOrigin?.message}
                    required
                >
                    <option value="">-- Выбери страну бормотухи --</option>
                    {Object.keys(COUNTRY).map((country) => (
                        <option key={country} value={country}>
                            {country}{" "}
                            <ReactCountryFlag
                                countryCode={
                                    //@ts-ignore
                                    COUNTRY[country] ?? ""
                                }
                            />
                        </option>
                    ))}
                </select>
                <Input
                    id="user"
                    label="User"
                    placeholder="User"
                    type="text"
                    required
                    {...register("user")}
                    error={errors.user?.message}
                />
                <Input
                    accept="image/*, .heic"
                    id="image"
                    label="Image"
                    placeholder="Image"
                    type="file"
                    {...register("image")}
                    error={errors.image?.message}
                />
            </div>
            {!isMutating ? (
                <div>
                    <button
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        type="submit"
                    >
                        Add item
                    </button>
                </div>
            ) : (
                <Spinner screen="grid place-items-center" />
            )}
        </form>
    );
}

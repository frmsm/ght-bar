"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@radix-ui/themes";

import { useSearchParams } from "next/navigation";

import Input from "@/components/input";

import useSubmit from "./use-submit";

const FilterSchema = z.object({
    strength: z.string().max(2).optional(),
    name: z.string().optional(),
    countryOrigin: z.string().optional(),
    user: z.string().optional(),
});

export type FilterSchemaType = z.infer<typeof FilterSchema>;

export default function Form({ setQuery }: any) {
    const searchParams = useSearchParams();

    const strength = searchParams.get("strength") || "";
    const name = searchParams.get("name") || "";
    const countryOrigin = searchParams.get("countryOrigin") || "";
    const user = searchParams.get("user") || "";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FilterSchemaType>({
        defaultValues: { strength, name, countryOrigin, user },
        resolver: zodResolver(FilterSchema),
    });

    const onSubmit = useSubmit(setQuery);

    return (
        <form
            className="flex justify-center 
            items-baseline
            sm:flex-col
            sm:items-stretch
             gap-x-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                {...register("strength")}
                error={errors.strength?.message}
                id="strength"
                label="Strength"
                placeholder="Strength"
                type="number"
                autoComplete
            />
            <Input
                {...register("user")}
                error={errors.user?.message}
                id="user"
                label="User"
                placeholder="User"
                type="text"
                autoComplete
            />
            <Input
                {...register("name")}
                error={errors.name?.message}
                id="name"
                label="Name"
                placeholder="Name"
                type="text"
                autoComplete
            />
            <Input
                {...register("countryOrigin")}
                error={errors.countryOrigin?.message}
                id="countryOrigin"
                label="Country"
                placeholder="Country"
                type="text"
                autoComplete
            />
            <Button
                size="3"
                variant="solid"
                // className="w-20 h-11 group relative flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                // type="submit"
            >
                Search
            </Button>
        </form>
    );
}

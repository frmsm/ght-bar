"use client";

import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Input from "@/components/input";

import { useRouter } from "next/navigation";

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

const SignUpSchema = z
    .object({
        email: z.string().email().trim(),
        password: z.string().min(8).max(20).trim(),
        confirmPassword: z.string().min(8).max(20).trim(),
        login: z.string().min(3).max(20).trim(),
        name: z.string().min(3).max(20).trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function Form() {
    const { trigger, isMutating, error } = useSWRMutation(
        "/api/signup",
        sendRequest /* опции */
    );
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

    const onSubmit = async (values: SignUpSchemaType) => {
        const formData = new FormData();

        for (const key in values) {
            //@ts-ignore
            formData.append(key, values[key]);
        }

        try {
            await trigger(formData);

            router.push("/login");
        } catch {
            console.log("error");
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center text-rose-400">
                <div>{error && error.info ? error.info.message : null}</div>
            </div>
            <div className=" rounded-md shadow-sm">
                <Input
                    {...register("email")}
                    autoComplete="email"
                    error={errors.email?.message}
                    id="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                />
                <Input
                    {...register("password")}
                    autoComplete="password"
                    error={errors.password?.message}
                    id="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                />
                <Input
                    {...register("confirmPassword")}
                    autoComplete="password"
                    error={errors.confirmPassword?.message}
                    id="confirmPassword"
                    label="Repeat password"
                    placeholder="Repeat password"
                    type="password"
                />
                <Input
                    {...register("login")}
                    autoComplete="nickname"
                    error={errors.login?.message}
                    id="login"
                    label="login"
                    placeholder="Login"
                    type="text"
                />
                <Input
                    {...register("name")}
                    autoComplete="username"
                    error={errors.name?.message}
                    id="name"
                    label="Name"
                    name="name"
                    placeholder="Name"
                    type="text"
                />
            </div>
            <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                disabled={isMutating}
                type="submit"
            >
                Sign up
            </button>
        </form>
    );
}

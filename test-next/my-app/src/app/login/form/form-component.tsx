"use client";

import { signIn } from "next-auth/react";

import React from "react";

const onSubmit = async (event: React.FormEvent<HTMLInputElement> | any) => {
    event.preventDefault();

    const params = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
        callbackUrl: "/",
    };

    await signIn("credentials", params);
};

export default function FormComponent({
    children,
}: {
    children: React.ReactNode[];
}) {
    return (
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {React.Children.toArray(children)}
        </form>
    );
}

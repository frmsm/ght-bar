import React, { useCallback } from "react";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { app } from "pages/_app";

import Router from "next/router";

import Input from "components/input";

const writeUserData = ({
    userId,
    name,
    email,
    login,
    imageUrl,
}: {
    userId: string;
    name: string;
    login: string;
    email: string;
    imageUrl: any;
}) => {};

const SignUp: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    return (
        <div className="flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    action="/api/signup"
                    method="post"
                >
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <Input
                            autoComplete="email"
                            label="Email"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <Input
                            autoComplete="password"
                            label="Password"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <Input
                            autoComplete="password"
                            label="Repeat password"
                            id="repeatPassword"
                            type="password"
                            name="repeatPassword"
                            placeholder="Repeat password"
                            required
                        />
                        <Input
                            autoComplete="nickname"
                            label="login"
                            id="login"
                            type="text"
                            name="login"
                            placeholder="Login"
                            required
                        />
                        <Input
                            autoComplete="username"
                            label="Name"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

export async function getServerSideProps(context: any) {
    console.log("gssp", { context });

    return {
        props: {},
    };
}

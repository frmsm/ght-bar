import React, { useCallback } from "react";
import type { NextPage } from "next";
import { app } from "pages/_app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import Router from "next/router";
import { getDatabase, ref, set } from "firebase/database";
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
}) => {
    const db = getDatabase();
    set(ref(db, "users/" + login), {
        login: login,
        userId,
        username: name,
        email: email,
        profile_picture: imageUrl,
    });
};

const SignUp: NextPage = () => {
    const handleSignUp = async (event: {
        preventDefault: () => void;
        target: {
            elements: {
                email: any;
                password: any;
                name: any;
                login: any;
                repeatPassword: any;
            };
        };
    }) => {
        event.preventDefault();
        const { email, password, repeatPassword, name, login } =
            event.target.elements;

        if (repeatPassword.value !== password.value) {
            alert("Password incorrect");
            return;
        }

        try {
            const auth = getAuth(app);
            const res = (await createUserWithEmailAndPassword(
                auth,
                email.value,
                password.value
            )) as any;

            //@ts-ignore
            updateProfile(auth.currentUser, {
                displayName: name.value,
                photoURL: "http://test_url",
            });

            // res.displayName = name.value;

            // console.log(res);

            localStorage.setItem("user", JSON.stringify(res));
            writeUserData({
                userId: res.user.uid,
                name: name.value,
                email: email.value,
                login: login.value,
                imageUrl: "http://test_url",
            });
            Router.push("/");
        } catch (error) {
            alert(error);
        }
    };

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
                    //@ts-ignore
                    onSubmit={handleSignUp}
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

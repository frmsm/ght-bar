import type { NextPage, InferGetServerSidePropsType } from "next";
import React, { useContext, useState } from "react";

import Input from "components/input";
import { useRouter } from "next/router";
import Router from "next/router";

export type Item = {
    code_iso: string;
    countryOrigin: string;
    createdAt: string; //date
    id: number; // ?? string ?
    image: string;
    name: string;
    notes: null | string;
    strength: number;
    type: string; // перевести в типы whiskey rome  итд
    updatedAt: string; //date
    user: string;
};

const Form: NextPage<{ setData: (value: any) => void }> = ({ setData }) => {
    const handleSearch = async (
        event: React.FormEvent<HTMLInputElement> | any
    ) => {
        event.preventDefault();

        const params = {
            countryOrigin: event.target.elements.countryOrigin.value,
            user: event.target.elements.user.value,
            name: event.target.elements.name.value,
            strength: event.target.elements.strength.value,
        } as any;

        const queryString = Object.keys(params)
            .filter((key: any) => params[key])
            .map((key: any) => key + "=" + params[key])
            .join("&");

        try {
            const res = await fetch(`/api/bottles?${queryString}`);
            const newData = await res.json();
            setData(newData);

            window.history.pushState({}, "", "?" + queryString);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            className="flex justify-center 
            sm:flex-col
             gap-x-4"
            //@ts-ignore
            onSubmit={handleSearch}
        >
            <Input
                autoComplete
                label="Strength"
                id="strength"
                type="text"
                name="strength"
                placeholder="Strength"
            />
            <Input
                autoComplete
                label="User"
                id="user"
                type="text"
                name="user"
                placeholder="User"
            />
            <Input
                autoComplete
                label="Name"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
            />
            <Input
                autoComplete
                label="Country"
                id="countryOrigin"
                type="text"
                name="countryOrigin"
                placeholder="Country"
            />
            <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default Form;

import React from "react";

import WhiskeyComponent from "@/components/whiskey";

import LoginForm from "./form/form";

export default function Login() {
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <div className="flex items-center justify-center ">
                        <WhiskeyComponent />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        GHT-BAR
                    </h2>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}

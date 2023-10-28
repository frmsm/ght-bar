import React from "react";

import Form from "./form";

export default function SignUp() {
    return (
        <div className="flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign Up
                </h2>
                <Form />
            </div>
        </div>
    );
}

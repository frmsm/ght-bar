import React from "react";
import SubmitButton from "./submit-button";
import FormComponent from "./form-component";

export default function LoginForm() {
    return (
        <FormComponent>
            <input name="remember" type="hidden" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label className="sr-only" htmlFor="email-address">
                        Username
                    </label>
                    <input
                        autoComplete="username"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        id="username"
                        name="username"
                        placeholder="Username"
                        type="username"
                        required
                    />
                </div>
                <div>
                    <label className="sr-only" htmlFor="password">
                        Password
                    </label>
                    <input
                        autoComplete="current-password"
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                    />
                </div>
            </div>
            {/* Пока закомментил запоминание и восстановление пароля
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                    >
                        Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <a
                        href="#"
                        className="font-medium text-emerald-600 hover:text-emerald-500"
                    >
                        Forgot your password?
                    </a>
                </div>
            </div> */}
            <SubmitButton />
        </FormComponent>
    );
}

import React, { InputHTMLAttributes } from "react";

const Input: React.FC<
    {
        label?: string;
        error?: string;
        autoComplete?: boolean;
    } & InputHTMLAttributes<HTMLInputElement>
> = React.forwardRef(({ label, error, ...rest }, ref) => {
    return (
        <div className="mb-4">
            <label htmlFor={rest.name} className="sr-only">
                {label}
            </label>
            <input
                //@ts-ignore
                ref={ref}
                className="relative block w-full  appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                {...rest}
            />
            <div className="text-rose-400 text-xs">{error}</div>
        </div>
    );
});

export default Input;

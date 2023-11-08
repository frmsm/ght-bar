/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { InputHTMLAttributes } from "react";

const Input: React.FC<
    | ({
          label?: string;
          error?: string;
          autoComplete?: boolean;
      } & InputHTMLAttributes<HTMLInputElement>)
    | any
> = React.forwardRef(({ label, error, ...rest }, ref) => {
    return (
        <div className="mb-4">
            <label className="sr-only" htmlFor={rest.name}>
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

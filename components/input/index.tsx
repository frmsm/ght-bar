/* eslint-disable react/display-name */
import React from "react";

const Input: React.FC<any> = React.forwardRef(
    (
        {
            // autoComplete,
            // name,
            label,
            // type = "text",
            // placeholder = "",
            // required = false,
            ...rest
        },
        ref
    ) => {
        return (
            <div>
                <label htmlFor={rest.name} className="sr-only">
                    {label}
                </label>
                <input
                    ref={ref}
                    // id={name}
                    // name={name}
                    // type={type}
                    // autoComplete={autoComplete}
                    // required={required}
                    className="mb-4 relative block w-full  appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                    // placeholder={placeholder}
                    {...rest}
                />
            </div>
        );
    }
);

export default Input;

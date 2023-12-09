"use client";
import React, { useState } from "react";
import Form from "../filter-form";

export default function FilterController() {
    const [isFilterOpen, setFilterOpen] = useState(false);

    return (
        <>
            <div
                className="h-6 justify-center hidden md:flex font-bold"
                onClick={() => setFilterOpen((prev) => !prev)}
            >
                {isFilterOpen ? "Hide filter" : "Show filter"}
            </div>
            <div className="p-4">
                <div
                    className={`truncate ${
                        isFilterOpen ? "md:h-400" : "md:h-0"
                    }`}
                >
                    <Form />
                </div>
            </div>
        </>
    );
}

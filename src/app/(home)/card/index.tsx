import React from "react";

import type { Item } from "@/models/types";

import ImageComponent from "./image";
import Header from "./header";
import Footer from "./footer";

export default function Card({
    image,
    name,
    notes,
    strength,
    user,
    countryOrigin,
    id,
}: Item) {
    return (
        <div
            className="hover:scale-105 hover:transition-transform w-full relative max-w-sm min-w-fit bg-white rounded-lg border border-gray-200 shadow-md "
            style={{ width: "296px" }}
        >
            <Header id={id} />
            <div className="flex flex-col items-center pb-10 gap-2">
                <br />
                <ImageComponent image={image} name={name} />
                <Footer
                    countryOrigin={countryOrigin}
                    name={name}
                    notes={notes}
                    strength={strength}
                    user={user}
                />
            </div>
        </div>
    );
}

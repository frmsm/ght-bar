import React from "react";
import Image from "next/image";

export default function WhiskeyComponent() {
    return (
        <Image
            alt="bottle"
            height={90}
            src={"/images/whiskey.svg"}
            width={90}
            priority
        />
    );
}

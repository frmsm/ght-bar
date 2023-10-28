import React from "react";
import Image from "next/image";

import { Item } from "@/models/types";

export default function ImageComponent({
    image,
    name,
}: {
    image: Item["image"];
    name: Item["name"];
}) {
    const defaultImageUrl = "/images/whiskey.svg";

    const imageUrl = image ? `/images/${image}` : defaultImageUrl;

    return (
        <Image
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            loading="lazy"
            quality={30}
            placeholder="blur"
            blurDataURL={defaultImageUrl}
            className="w-40 h-40 rounded-full"
        />
    );
}

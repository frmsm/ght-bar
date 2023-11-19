"use client";
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

    const imageUrl = image ? `http://ght.bar/images/${image}` : defaultImageUrl;

    return (
        <Image
            alt={name}
            blurDataURL={defaultImageUrl}
            className="w-40 h-40 rounded-full"
            height={200}
            loading="lazy"
            placeholder="blur"
            quality={30}
            src={imageUrl}
            width={200}
        />
    );
}

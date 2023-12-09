"use client";
import React from "react";
import type { Item } from "@/models/types";
import Card from "../card";

export default function Items({ bottles }: { bottles: Item[] }) {
    React.useEffect(() => {
        function elementInViewport() {
            if (window.innerWidth > 715) {
                return;
            }

            //@ts-ignore
            const cards: HTMLElement[] =
                document.querySelectorAll(".card-element");

            cards.forEach((myElement) => {
                const bounding = myElement.getBoundingClientRect();

                if (
                    bounding.top >= 0 &&
                    bounding.left >= 0 &&
                    bounding.right <=
                        (window.innerWidth ||
                            document.documentElement.clientWidth) &&
                    bounding.bottom <=
                        (window.innerHeight ||
                            document.documentElement.clientHeight)
                ) {
                    myElement.style["transform"] = "scale(1.05)";
                } else {
                    myElement.style["transform"] = "scale(1)";
                }
            });
        }

        elementInViewport();

        addEventListener("scroll", elementInViewport);

        return () => removeEventListener("scroll", elementInViewport);
    }, []);

    return (
        <div className="flex  flex-wrap  gap-8 justify-center">
            {bottles?.map((bottle: Item) => {
                return <Card key={bottle.id.toString()} {...bottle} />;
            })}
        </div>
    );
}

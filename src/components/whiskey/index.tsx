import Image from "next/image";

export default function WhiskeyComponent() {
    return (
        <Image
            width={90}
            height={90}
            priority
            alt="bottle"
            src={"/images/whiskey.svg"}
        />
    );
}

import React from "react";

import "./globals.css";

import type { Metadata } from "next";

import Header from "@/components/header";
import SessionProviderComponent from "./session-provider";
import Toast from "@/components/toast";

export const metadata: Metadata = {
    title: "GHT Bar",
    // description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <SessionProviderComponent>
                    <div className="flex flex-col min-h-full">
                        {/* @ts-ignore */}
                        <Header />
                        <div className="flex grow [&>*]:grow">{children}</div>
                    </div>
                </SessionProviderComponent>
                <Toast />
            </body>
        </html>
    );
}

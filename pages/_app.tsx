import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Spinner from "components/spinner";
import { usePageEnter } from "hooks/use-page-enter";
import { getAuth, signOut } from "firebase/auth";
import { AuthProvider } from "components/context/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Router from "next/router";
import Header from "components/header";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5_XzB89i-uBnawYidkHi2mM4qmeWdzcY",
    authDomain: "ght-bar.firebaseapp.com",
    projectId: "ght-bar",
    storageBucket: "ght-bar.appspot.com",
    messagingSenderId: "517748107863",
    appId: "1:517748107863:web:84019da47623dcd7b59112",
    measurementId: "G-DPTK99T4RQ",
    databaseURL:
        "https://ght-bar-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function MyApp({ Component, pageProps }: AppProps) {
    // const isLoading = usePageEnter();

    // if (isLoading) {
    //     return <Spinner />;
    // }

    return (
        <AuthProvider>
            <div className="flex flex-col min-h-full">
                <Header />
                <div className="flex grow [&>*]:grow">
                    <Component {...pageProps} />
                </div>
            </div>
        </AuthProvider>
    );
}

export default MyApp;

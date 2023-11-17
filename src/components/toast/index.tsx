"use client";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

import { ToastContainer } from "react-toastify";

export default function Toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    );
}

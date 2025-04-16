import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./assets/**/*.{ts,tsx}",
        "./context/**/*.{ts,tsx}",
        "./src/styles/**/*.{css}",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["var(--font-montserrat)"],
                nokora: ["var(--font-nokora)"],
            },
        },
    },
    plugins: [],
};

export default config;
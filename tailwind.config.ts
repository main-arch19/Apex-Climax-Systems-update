import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0A",
                primary: "#00A3FF", // Cooling Blue
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
        },
    },
    plugins: [],
};
export default config;

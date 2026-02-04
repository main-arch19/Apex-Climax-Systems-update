import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested or fallback
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Apex Climate Systems",
    description: "Precision climate control for modern living.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="no-scrollbar">
            <body className={`${inter.className} bg-[#0A0A0A] text-white no-scrollbar antialiased`}>
                {children}
            </body>
        </html>
    );
}

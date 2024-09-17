import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Super Awesome Online Store",
    description: "A Super new and Awesome Store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
            >
                <NavBar />
                {children}
                <footer className="footer py-6 bg-black text-white text-center">
                    <div>
                        @2024 Created by{" "}
                        <span className="underline">Kevin Ybarra</span>
                    </div>
                </footer>
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"]
});

export const metadata: Metadata = {
  title: "To Do List",
  description: "Organize your daily tasks with ease. Add, edit, and delete your tasks quickly and efficiently."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        {children}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-highlight/node_modules/highlight.js/styles/dracula.css"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat GPT clone",
  description: "Chat GPT clone by web3_lario",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatBot } from "../components/chatbot/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carlos Portfolio",
  description: "Personal portfolio with AI Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}

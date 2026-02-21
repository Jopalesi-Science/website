import type { Metadata } from "next";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";
import Nav from "@/components/Nav";
import CursorBox from "@/components/CursorBox";

export const metadata: Metadata = {
  title: "Jopalesi",
  description: "—",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ShaderBackground />
        <Nav />
        <CursorBox />
        {children}
      </body>
    </html>
  );
}

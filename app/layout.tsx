import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Homepage - Producer</title>
        <link rel="icon" href="producer-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

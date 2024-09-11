import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Quiosco Next.js con App Router y Prisma",
  description: "Quiosco Next.js con App Router y Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}

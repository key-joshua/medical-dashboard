import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  authors: [{ name: "TechCare" }],
  icons: "https://res.cloudinary.com/dtq8fh82n/image/upload/v1745594819/logo-small_xavpbh.png?height=40&width=40",
  title: "Medical Dashboard - Patient Profile",
  keywords: ["medical", "dashboard", "patient", "profile"],
  description: "A responsive medical dashboard for patient management",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dtq8fh82n/image/upload/v1745594819/logo-small_xavpbh.png?height=40&width=40" />
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/dtq8fh82n/image/upload/v1745594819/logo-small_xavpbh.png?height=40&width=40" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}> {children} </body>
    </html>
  );
}

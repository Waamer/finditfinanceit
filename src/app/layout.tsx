import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react"
import "./globals.css"
import Nav from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FindItFinanceIt - Get Pre-Approved for Your Dream Car",
  description:
    "Get instant pre-approval for car financing. Quick application, competitive rates, and drive away today. Find your perfect vehicle financing solution.",
  generator: "v0.app",
  keywords: "car financing, auto loans, vehicle financing, pre-approval, car loans, automotive financing",
  authors: [{ name: "FindItFinanceIt" }],
  openGraph: {
    title: "FindItFinanceIt - Get Pre-Approved for Your Dream Car",
    description:
      "Get instant pre-approval for car financing. Quick application, competitive rates, and drive away today.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <Nav />
        <Suspense fallback={null}>{children}</Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}

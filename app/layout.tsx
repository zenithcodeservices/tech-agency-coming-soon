import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "OPUS CREATIVES - Digital Agency | Web Development",
  description: "A technology-driven agency helping brands move faster, smarter, and bolder. We build powerful web applications and digital platforms that scale.",
  keywords: "web development, web applications, brand development, digital agency, UI/UX, Next.js, React, TypeScript",
  authors: [{ name: "OPUS CREATIVES" }],
  openGraph: {
    title: "OPUS CREATIVES - Digital Agency",
    description: "We build powerful web applications and digital platforms that scale.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

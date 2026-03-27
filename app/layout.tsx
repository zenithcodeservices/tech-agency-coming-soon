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
  title: "Opus Creatives | Senior Full Stack Engineering for Startups",
  description: "Tim Lehane — senior full stack engineer helping funded startups and growing businesses ship faster. Web apps, mobile, APIs, and cloud infrastructure. AWS Certified. Based in London.",
  keywords: "freelance developer London, senior full stack engineer, React Next.js developer, React Native mobile apps, AWS certified developer, startup MVP development, Node.js TypeScript",
  authors: [{ name: "Tim Lehane" }],
  openGraph: {
    title: "Opus Creatives | Senior Full Stack Engineering for Startups",
    description: "Ship faster without hiring a full-time dev team. Senior-engineer quality, startup speed. AWS Certified. Based in London.",
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

import type { Metadata } from "next"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions"
import { ThemeProvider } from "../components/ThemeProvider"
import { cn } from "../lib/utils"
import "./globals.css"
import type React from "react"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "SK - Software Engineer",
  description: "Samyak Kakatur's Portfolio - Software Engineer specializing in modern web development, React, TypeScript, and cloud technologies. Explore projects, technical skills, and professional experience.",
  icons: {
    icon: "/pfp.jpeg",
  },
  openGraph: {
    title: "SK - Software Engineer",
    description: "Samyak Kakatur's Portfolio - Software Engineer specializing in modern web development, React, TypeScript, and cloud technologies. Explore projects, technical skills, and professional experience.",
    url: "https://skakatur.dev",
    images: [
      {
        url: "https://skakatur.dev/pfp.jpeg",
        width: 748,
        height: 748,
        alt: "SK - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SK - Software Engineer",
    description: "Samyak Kakatur's Portfolio - Software Engineer specializing in modern web development, React, TypeScript, and cloud technologies. Explore projects, technical skills, and professional experience.",
    images: [
      {
        url: "https://skakatur.dev/pfp.jpeg",
        width: 748,
        height: 748,
        alt: "SK - Software Engineer",
      },
    ],
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <head>
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          async
          defer
        />
      </head>
      <body className={cn("min-h-screen min-w-[300px] bg-background font-sans antialiased", `${geistSans.variable} ${geistMono.variable}`)}>
        <ViewTransitions>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ViewTransitions>
      </body>
    </html>
  )
}

export default RootLayout

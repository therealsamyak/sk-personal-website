import type { Metadata } from "next"
import Script from "next/script"
import { ViewTransitions } from "next-view-transitions"
import { CookieBanner } from "@/components/CookieBanner"
import { ThemeProvider } from "@/components/ThemeProvider"
import { PolicyStackProvider } from "@/app/providers"
import "./globals.css"
import "./font-subsets.css"
import type React from "react"

export const metadata: Metadata = {
  title: "SK - Software Engineer",
  description: "Portfolio showcasing projects and skills",
  icons: {
    icon: "/pfp.jpeg",
  },
  openGraph: {
    title: "SK - Software Engineer",
    description: "Portfolio showcasing projects and skills",
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
    description: "Portfolio showcasing projects and skills",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/web-jetbrains-core.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Script id="theme-script" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");if(!t||t==="system"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t}catch(e){}})()`}
        </Script>
      </head>
      <body className="min-h-screen min-w-[300px] bg-background font-sans antialiased">
        <ViewTransitions>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PolicyStackProvider>
              {children}
              <CookieBanner />
            </PolicyStackProvider>
          </ThemeProvider>
        </ViewTransitions>
      </body>
    </html>
  )
}

export default RootLayout

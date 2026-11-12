import type { Metadata } from "next"
import Script from "next/script"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { UmamiAnalytics } from "@/components/UmamiAnalytics/UmamiAnalytics"
import "./globals.css"
import "./font-subsets.css"
import { Suspense, ViewTransition, type ReactNode } from "react"

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

const RootLayout = ({ children }: { children: ReactNode }) => {
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
      <body className="min-h-dvh min-w-[300px] bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ViewTransition name="page" default="none" update="auto">
            <div className="flex min-h-dvh flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ViewTransition>
          <Suspense fallback={null}>
            <UmamiAnalytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout

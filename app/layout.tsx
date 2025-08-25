import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"
import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SK - Software Engineer",
  description: "Portfolio showcasing projects and skills",
  icons: {
    icon: "/pfp.jpeg",
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
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

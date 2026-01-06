"use client"

import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { createContext, useContext, useEffect, useState } from "react"

type Coords = { x: number; y: number }

type ThemeProviderState = {
  toggleTheme: (coords?: Coords) => void
}

const initialState: ThemeProviderState = {
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }

  return (
    <NextThemesProvider {...props}>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </NextThemesProvider>
  )
}

const ThemeProviderInner = ({ children }: { children: React.ReactNode }) => {
  const handleThemeToggle = (coords?: Coords) => {
    const root = document.documentElement

    if (coords) {
      root.style.setProperty("--x", `${coords.x}px`)
      root.style.setProperty("--y", `${coords.y}px`)
    }

    if (!document.startViewTransition) {
      // Fallback for browsers that don't support view transitions
      const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
      const newTheme = currentTheme === "light" ? "dark" : "light"

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return
    }

    const profileTransitionNames = ["profile-image", "profile-name", "social-links"]
    const savedStyles: Array<{ element: HTMLElement; name: string }> = []

    profileTransitionNames.forEach((name) => {
      const elements = document.querySelectorAll(`[style*="view-transition-name: ${name}"]`)
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement
        savedStyles.push({ element: htmlElement, name })
        htmlElement.style.viewTransitionName = ""
      })
    })

    root.style.viewTransitionName = "theme-switch"

    document
      .startViewTransition(() => {
        const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
        const newTheme = currentTheme === "light" ? "dark" : "light"

        if (newTheme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      })
      .finished.then(() => {
        savedStyles.forEach(({ element, name }) => {
          element.style.viewTransitionName = name
        })

        root.style.viewTransitionName = ""
      })
  }

  const value: ThemeProviderState = {
    toggleTheme: handleThemeToggle,
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useThemeToggle = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useThemeToggle must be used within a ThemeProvider")
  }

  return context
}

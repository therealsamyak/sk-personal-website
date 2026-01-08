"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  const setRippleCoordinates = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    const root = document.documentElement

    if (coords) {
      root.style.setProperty("--x", `${coords.x}px`)
      root.style.setProperty("--y", `${coords.y}px`)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  const handleViewTransition = (callback: () => void) => {
    const root = document.documentElement

    if (!document.startViewTransition) {
      callback()
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

    document.startViewTransition(callback).finished.then(() => {
      savedStyles.forEach(({ element, name }) => {
        element.style.viewTransitionName = name
      })

      root.style.viewTransitionName = ""
    })
  }

  return (
    <button
      onClick={(event) => {
        setRippleCoordinates(event)
        handleViewTransition(toggleTheme)
      }}
      className="relative flex h-9 w-16 items-center rounded-full border border-input bg-slate-200 p-1 transition-all duration-300 hover:shadow-md dark:bg-slate-800"
      aria-label="Toggle theme"
      type="button"
    >
      {/* Switch knob */}
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out dark:translate-x-7 dark:bg-slate-900">
        <Sun className="h-4 w-4 text-amber-500 transition-all duration-300 dark:scale-0 dark:opacity-0" />
        <Moon className="absolute h-4 w-4 scale-0 text-blue-300 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100" />
      </div>

      {/* Background icons */}
      <Sun className="absolute left-2 h-3 w-3 text-white/70 opacity-0 transition-all duration-300 dark:opacity-60" />
      <Moon className="absolute right-2 h-3 w-3 text-black opacity-60 transition-all duration-300 dark:text-slate-400 dark:opacity-0" />

      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

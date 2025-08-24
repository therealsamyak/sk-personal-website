"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative flex h-9 w-16 items-center rounded-full border border-input bg-slate-200 p-1 transition-all duration-300 hover:shadow-md dark:bg-slate-800"
      aria-label="Toggle theme"
      type="button"
    >
      {/* Switch knob */}
      <div className="flex h-7 w-7 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out dark:translate-x-7 dark:bg-slate-900">
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

import { personalInfo } from "@/config/site"

export const Footer = () => (
  <footer className="h-16 shrink-0 border-t">
    <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-6 xl:px-4 2xl:px-2">
      <p className="text-zinc-500 text-sm dark:text-zinc-400">© 2025 {personalInfo.name}</p>
    </div>
  </footer>
)

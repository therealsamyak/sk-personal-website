import { Link } from "next-view-transitions"
import { personalInfo } from "@/config/site"

export const Footer = () => (
  <footer className="h-16 shrink-0 border-t">
    <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-6 xl:px-4 2xl:px-2">
      <p className="text-zinc-500 text-sm dark:text-zinc-400">© 2025 {personalInfo.name}</p>
      <nav className="flex items-center gap-4 text-sm">
        <Link
          href="/privacy"
          className="text-zinc-500 transition-colors hover:text-foreground dark:text-zinc-400"
        >
          Privacy
        </Link>
        <Link
          href="/cookie-policy"
          className="text-zinc-500 transition-colors hover:text-foreground dark:text-zinc-400"
        >
          Cookies
        </Link>
      </nav>
    </div>
  </footer>
)

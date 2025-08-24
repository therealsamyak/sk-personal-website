"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { navigation, personalInfo } from "@/config/site"

export const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="relative mx-auto flex h-14 w-full items-center justify-between px-4 md:px-6">
      {/* Left: Logo */}
      <div className="flex flex-shrink-0 items-center">
        <Link className="mr-6 flex items-center space-x-2" href="/">
          <span className="font-bold">SK</span>
        </Link>
      </div>

      {/* Center: Nav (absolute center of the page, hidden on small) */}
      <nav className="-translate-x-1/2 absolute left-1/2 hidden transform items-center space-x-6 font-medium text-sm sm:flex">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Right: Controls */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        {personalInfo.resumeUrl && (
          <Button
            variant="outline"
            onClick={() => window.open(personalInfo.resumeUrl, "_blank")}
            className="cursor-pointer"
          >
            Resume
          </Button>
        )}
      </div>
    </div>
  </header>
)

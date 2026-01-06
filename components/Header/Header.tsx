"use client"

import { Linkedin, Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Link } from "next-view-transitions"
import { useState } from "react"
import { siGithub, siX } from "simple-icons"
import { ThemeToggle } from "@/components/ThemeToggle"
import { navigation, personalInfo } from "@/config/site"
import { Button } from "@/ui/button"

export const Header = () => {
  const pathname = usePathname()
  const isSubPage = pathname !== "/"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="relative mx-auto flex h-14 w-full max-w-full items-center justify-between px-4 md:px-6">
        {/* Left: Logo/Profile */}
        <div className="flex shrink-0 items-center">
          <Link
            className="mr-2 flex min-w-0 items-center space-x-1.5 sm:mr-3 sm:space-x-2"
            href="/"
          >
            {/* Desktop: Show PFP on sub-pages, Mobile: Always show PFP on sub-pages */}
            {isSubPage && personalInfo.profileImage && (
              <div
                className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full"
                style={{ viewTransitionName: "profile-image" }}
              >
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {isSubPage && (
              <span
                className="whitespace-nowrap font-bold text-sm sm:text-base"
                style={{ viewTransitionName: "profile-name" }}
              >
                {personalInfo.name}
              </span>
            )}
          </Link>

          {/* Desktop: Social links on sub-pages, Mobile: Hidden */}
          {isSubPage && (
            <div
              className="ml-2 hidden shrink-0 items-center gap-2 lg:flex"
              style={{ viewTransitionName: "social-links" }}
            >
              {personalInfo.socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    {social.icon === "siGithub" && (
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                        <title>GitHub</title>
                        <path d={siGithub.path} />
                      </svg>
                    )}
                    {social.icon === "siLinkedin" && <Linkedin className="h-3 w-3" />}
                    {social.icon === "siX" && (
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                        <title>X (Twitter)</title>
                        <path d={siX.path} />
                      </svg>
                    )}
                    <span className="sr-only">{social.platform}</span>
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Center: Nav (absolute center of the page, hidden on small) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center space-x-6 font-medium text-sm sm:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActive ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Button - Only show on small screens */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>

          <ThemeToggle />
          {personalInfo.resumeUrl && (
            <Button
              variant="default"
              onClick={() => window.open(personalInfo.resumeUrl, "_blank")}
              className="hidden cursor-pointer sm:inline-flex"
            >
              Resume
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background sm:hidden">
          <div className="space-y-3 px-4 py-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 font-medium text-base transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive ? "bg-accent text-accent-foreground" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            {personalInfo.resumeUrl && (
              <Button
                variant="default"
                onClick={() => {
                  window.open(personalInfo.resumeUrl, "_blank")
                  setMobileMenuOpen(false)
                }}
                className="w-full cursor-pointer"
              >
                Resume
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

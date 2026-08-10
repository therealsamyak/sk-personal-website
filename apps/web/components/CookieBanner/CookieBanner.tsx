"use client"

import { useCategory, useConsent } from "@policystack/react/consent"
import { Cookie as CookieIcon, X } from "lucide-react"
import { Link } from "next-view-transitions"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"

function CategoryRow({
  category,
}: {
  category: ReturnType<typeof useConsent>["categories"][number]
}) {
  const { granted, toggle } = useCategory(category.key)
  const locked = category.locked === true
  const checked = locked ? true : granted

  return (
    <label
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors",
        !locked && "cursor-pointer hover:bg-muted/50",
      )}
    >
      <input
        type="checkbox"
        className="mt-0.5 size-4 accent-[var(--primary)]"
        checked={checked}
        disabled={locked}
        onChange={locked ? undefined : toggle}
        aria-label={category.label}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{category.label}</span>
          {locked && (
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground text-[0.625rem] uppercase tracking-wide">
              Required
            </span>
          )}
        </div>
        {category.description && (
          <p className="text-muted-foreground text-xs leading-relaxed">{category.description}</p>
        )}
        {category.purpose && !category.description && (
          <p className="text-muted-foreground text-xs leading-relaxed">{category.purpose}</p>
        )}
      </div>
    </label>
  )
}

export function CookieBanner() {
  const { route, categories, acceptAll, acceptNecessary, setRoute, save } = useConsent()
  const modalRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const prevRoute = useRef(route)
  const [mounted, setMounted] = useState(false)

  // Defer render until mounted so the banner/store don't flash during SSR hydration.
  useEffect(() => setMounted(true), [])

  // Drive the native <dialog> lifecycle from PolicyStack route state.
  useEffect(() => {
    const dialog = modalRef.current
    if (!dialog) return

    if (route === "preferences" && !dialog.open) {
      dialog.showModal()
    }

    // Restoring focus when leaving the preferences route.
    if (prevRoute.current === "preferences" && route !== "preferences") {
      if (dialog.open) dialog.close()
      triggerRef.current?.focus()
      triggerRef.current = null
    }

    prevRoute.current = route
  }, [route])

  const openPreferences = () => {
    triggerRef.current = document.activeElement as HTMLElement
    setRoute("preferences")
  }

  if (!mounted) return null

  return (
    <>
      {route === "cookie" && (
        <section aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
          <div className="bg-card text-card-foreground mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-xl border p-4 shadow-lg sm:flex-row sm:items-center sm:gap-4 sm:p-5">
            <CookieIcon className="size-5 shrink-0 text-muted-foreground sm:mt-0.5" />
            <p className="min-w-0 flex-1 text-sm leading-relaxed">
              We use cookies to keep the site running and improve your experience. See our{" "}
              <Link
                href="/cookie-policy"
                className="text-foreground underline underline-offset-2 hover:opacity-80"
              >
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="outline" size="sm" onClick={openPreferences}>
                Customize
              </Button>
              <Button variant="ghost" size="sm" onClick={acceptNecessary}>
                Necessary only
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Accept all
              </Button>
            </div>
          </div>
        </section>
      )}

      <dialog
        ref={modalRef}
        aria-label="Cookie preferences"
        onCancel={(e) => {
          e.preventDefault()
          setRoute("cookie")
        }}
        className="bg-card text-card-foreground w-full max-w-md rounded-xl border p-5 shadow-xl [&::backdrop]:bg-black/50 [&::backdrop]:backdrop-blur-[2px]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-base">Cookie preferences</h2>
              <p className="text-muted-foreground text-xs">Choose which categories to allow.</p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setRoute("cookie")}
              aria-label="Close preferences"
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <CategoryRow key={category.key} category={category} />
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row-reverse">
            <Button className="flex-1" onClick={save}>
              Save preferences
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setRoute("cookie")}>
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}

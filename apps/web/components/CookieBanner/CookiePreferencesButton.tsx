"use client"

import { useConsent } from "@policystack/react/consent"

// Open saved cookie preferences from the footer.
export function CookiePreferencesButton() {
  const { setRoute } = useConsent()
  return (
    <button
      type="button"
      onClick={() => setRoute("preferences")}
      className="text-zinc-500 transition-colors hover:text-foreground dark:text-zinc-400"
    >
      Cookie preferences
    </button>
  )
}

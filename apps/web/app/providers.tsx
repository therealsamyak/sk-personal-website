"use client"

import { localStorageAdapter } from "@policystack/core/consent/storage/local-storage"
import { PolicyStack } from "@policystack/react/provider"
import type { ReactNode } from "react"
import config from "@/policystack"

// Provide cookie consent with persistent browser storage.
export function PolicyStackProvider({ children }: { children: ReactNode }) {
  return (
    <PolicyStack config={{ ...config, consent: { adapter: localStorageAdapter() } }}>
      {children}
    </PolicyStack>
  )
}

"use client"

import { PolicyStack } from "@policystack/react/provider"
import type { ReactNode } from "react"
import config from "@/policystack"

export function PolicyStackProvider({ children }: { children: ReactNode }) {
  return <PolicyStack config={config}>{children}</PolicyStack>
}

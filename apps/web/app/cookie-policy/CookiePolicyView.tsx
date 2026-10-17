"use client"

import { CookiePolicy } from "@policystack/react/policy"
import config from "@/policystack"

export function CookiePolicyView() {
  return <CookiePolicy config={config} />
}

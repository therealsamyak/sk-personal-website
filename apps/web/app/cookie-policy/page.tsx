import type { Metadata } from "next"
import { CookiePolicy } from "@policystack/react/policy"
import config from "@/policystack"

export const metadata: Metadata = {
  title: "Cookie Policy - SK",
}

export default function CookiePolicyPage() {
  return <CookiePolicy config={config} />
}

import type { Metadata } from "next"

import { CookiePolicyView } from "./CookiePolicyView"

export const metadata: Metadata = {
  title: "Cookie Policy - SK",
}

export default function CookiePolicyPage() {
  return <CookiePolicyView />
}

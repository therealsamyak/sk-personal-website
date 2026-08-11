import type { Metadata } from "next"

import { PrivacyPolicyView } from "./PrivacyPolicyView"

export const metadata: Metadata = {
  title: "Privacy Policy - SK",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />
}

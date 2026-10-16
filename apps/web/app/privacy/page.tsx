import type { Metadata } from "next"
import { PrivacyPolicy } from "@policystack/react/policy"
import config from "@/policystack"

export const metadata: Metadata = {
  title: "Privacy Policy - SK",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy config={config} />
}

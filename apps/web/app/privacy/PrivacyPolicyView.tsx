"use client"

import { PrivacyPolicy } from "@policystack/react/policy"
import config from "@/policystack"

export function PrivacyPolicyView() {
  return <PrivacyPolicy config={config} />
}

import type { Category } from "@policystack/core/consent"

export const categories: Category[] = [
  {
    key: "essential",
    label: "Essential",
    locked: true,
    description: "Stores your theme cookie and consent preferences in this browser.",
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "Loads the operator-run Umami script after you consent.",
  },
]

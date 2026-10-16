import type { Category } from "@policystack/core/consent"

export const categories: Category[] = [
  {
    key: "essential",
    label: "Essential",
    locked: true,
    description: "Required for the site to work.",
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "Helps us understand how the site is used.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description: "Used to personalize content and campaigns.",
  },
]

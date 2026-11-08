import { Children, type ComponentProps, type ReactNode } from "react"
import { DefaultTable } from "@policystack/react/policy"

type PolicyStackTableProps = ComponentProps<typeof DefaultTable>

// Render PolicyStack rows in a tbody so browser HTML parsing matches React hydration.
export function PolicyStackTable({ children }: PolicyStackTableProps) {
  const [header, ...rows] = Children.toArray(children) as Exclude<
    ReactNode,
    boolean | null | undefined
  >[]

  return (
    <table data-op-table="true">
      {header}
      <tbody>{rows}</tbody>
    </table>
  )
}

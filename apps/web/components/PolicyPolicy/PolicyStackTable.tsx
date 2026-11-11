import { Children, type ComponentProps } from "react"
import { DefaultTable } from "@policystack/react/policy"

// oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Keyboard users must be able to focus the horizontal scroll region.

type PolicyStackTableProps = ComponentProps<typeof DefaultTable>

// Keep privacy policy tables readable and horizontally scrollable on narrow screens.
export function PolicyStackTable({ children }: PolicyStackTableProps) {
  const [header, ...rows] = Children.toArray(children)

  return (
    <div>
      <p className="text-muted-foreground mb-2 text-sm lg:hidden">
        Scroll horizontally to see all columns.
      </p>
      <section className="policy-table-scroll" aria-label="Privacy policy table" tabIndex={0}>
        <table data-op-table="true">
          {header}
          <tbody>{rows}</tbody>
        </table>
      </section>
    </div>
  )
}

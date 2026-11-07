import { DefaultTable, type PolicyComponents } from "@policystack/react/policy"
import { Children } from "react"

// Keep policy tables readable and keyboard-scrollable on narrow screens.
export const policyComponents = {
  Table: ({ node, children }) => {
    const [header, ...rows] = Children.toArray(children)
    return (
      // Keyboard focus lets readers scroll policy tables with the arrow keys.
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      <section className="policy-table-scroll" aria-label="Policy table" tabIndex={0}>
        <DefaultTable node={node}>
          {header}
          {/* Explicit tbody prevents browser normalization from breaking hydration. */}
          <tbody>{rows}</tbody>
        </DefaultTable>
      </section>
    )
  },
} satisfies PolicyComponents

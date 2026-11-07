"use client"

import { PrivacyPolicy } from "@policystack/react/policy"
import { Link } from "next-view-transitions"
import { PolicyStackTable } from "@/components/PolicyPolicy/PolicyStackTable"
import config from "@/policystack"

export function PrivacyPolicyView() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <PrivacyPolicy config={config} components={{ Table: PolicyStackTable }} />
      <section aria-labelledby="analytics-and-local-storage" className="mt-12 space-y-4">
        <h1 id="analytics-and-local-storage" className="text-2xl font-semibold">
          Analytics and local storage
        </h1>
        <p>
          Samyak Kakatur operates the self-hosted Umami service used for aggregate usage statistics. The
          Umami script loads only after you allow analytics. When you withdraw consent, the script
          is removed and no further analytics requests are sent.
        </p>
        <p>With analytics consent, Umami processes:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Page views, URLs, referrers, and visit times.</li>
          <li>Browser, device, language, and screen information.</li>
          <li>IP-derived pseudonymous session and aggregate data.</li>
        </ul>
        <p>
          Umami does not use cookies and does not track you across separate Umami website IDs. It
          processes the request IP address to derive session and aggregate values. Contact-form
          content is not sent to Umami.
        </p>
        <p>
          Your theme and consent preferences are stored in your browser. They remain on the current
          device and do not sync between devices.
        </p>
        <p>
          Cloudflare hosts this site and the future analytics tunnel. It processes limited technical
          request data, including IP addresses, for delivery and security. You can contact{" "}
          <a href="mailto:removed@example.invalid" className="underline underline-offset-2">
            removed@example.invalid
          </a>{" "}
          with analytics or privacy questions.
        </p>
        <p>
          Read the{" "}
          <Link href="/cookie-policy" className="underline underline-offset-2">
            cookie policy
          </Link>{" "}
          for storage controls.
        </p>
      </section>
    </div>
  )
}

"use client"

import { CookiePolicy } from "@policystack/react/policy"
import { Link } from "next-view-transitions"
import config from "@/policystack"

export function CookiePolicyView() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <CookiePolicy config={config} />
      <section aria-labelledby="umami-and-storage" className="mt-12 space-y-4">
        <h1 id="umami-and-storage" className="text-2xl font-semibold">
          Umami and storage
        </h1>
        <p>
          Umami does not set or read cookies. After analytics consent, this site loads Umami’s
          browser script and sends page-view events. On withdrawal, the script is removed and
          analytics stops.
        </p>
        <p>
          Consent preferences and the website theme use browser local storage. The blog theme uses a
          first-party browser cookie. These values stay on the current device and do not sync
          between devices.
        </p>
        <p>
          Cloudflare performs technical hosting and security processing for every request. This
          processing is necessary to deliver the site and is not an analytics consent category.
        </p>
        <p>
          Declining analytics does not remove core site functionality. Send privacy questions to{" "}
          <a href="mailto:therealsamyak@gmail.com" className="underline underline-offset-2">
            therealsamyak@gmail.com
          </a>
          .
        </p>
        <p>
          Read the{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>{" "}
          for detailed analytics processing.
        </p>
      </section>
    </main>
  )
}

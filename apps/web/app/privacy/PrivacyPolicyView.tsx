import Link from "next/link"

// Describe the website's hosting and cookieless Umami statistics in a short privacy notice.
export function PrivacyPolicyView() {
  return (
    <article data-privacy-policy className="w-full">
      <h1>Privacy</h1>
      <p className="text-sm text-muted-foreground">Last updated November 14, 2026.</p>
      <p>
        We respect your privacy. Your preferences are stored locally in your browser using Local
        Storage. This means your preferences do not sync between devices. We do not track you across
        websites, and we do not collect names or email addresses through our analytics.
      </p>
      <p>
        This website is hosted on Cloudflare Workers, which may process limited technical data for
        security and performance. We also use self-hosted Umami to collect aggregated usage
        statistics to help improve the website. For more information on how these services handle
        data, refer to their respective privacy policies.
      </p>

      <h2>Data we collect</h2>
      <p>
        This website does not use tracking cookies. Your theme preference is stored locally in your
        browser using Local Storage. We do not send names, email addresses, or form contents to
        Umami. However, we use a script provided by Umami for usage statistics.
      </p>
      <p>
        If you use the contact form, Cloudflare Turnstile checks for abuse and{" "}
        <a href="https://resend.com/legal/privacy-policy">Resend</a> delivers your name, email
        address, and message by email. The website does not store submissions in an application
        database. Copies remain with the email service and in recipient mailboxes. This is separate
        from analytics.
      </p>

      <h2>Cloudflare Workers</h2>
      <p>
        We use Cloudflare Workers provided by Cloudflare, Inc., 101 Townsend St, San Francisco, CA
        94107, USA ("Cloudflare") as our hosting provider. Using Cloudflare Workers allows us to
        provide a stable and secure website.
      </p>
      <p>As a hosting provider, Cloudflare may process the following information:</p>
      <ul>
        <li>IP addresses</li>
        <li>Referring websites</li>
        <li>Date and time</li>
        <li>Data volume</li>
        <li>Website addresses</li>
        <li>Browser and operating system information</li>
      </ul>
      <p>
        Cloudflare may aggregate usage data for statistical and operational purposes. More detailed
        information is available at{" "}
        <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare’s privacy policy</a>.
      </p>

      <h2>Umami Software</h2>
      <p>
        We use Umami, a privacy-friendly web analytics service hosted by us, to collect data about
        website usage. This helps us understand overall traffic trends, such as which pages are
        visited most.
      </p>
      <p>The data collected by Umami includes:</p>
      <ul>
        <li>Page views and page addresses</li>
        <li>Referring URLs</li>
        <li>Device type, browser, operating system, language, and screen size</li>
        <li>IP addresses, processed to derive location and visitor statistics</li>
        <li>Approximate location</li>
        <li>Time of visit and duration</li>
      </ul>
      <p>
        Umami does not use tracking cookies and does not store raw IP addresses in analytics
        records. It uses a rotating hashed identifier to group visits. We do not supply personal
        user IDs or use session recordings. The tracker respects your browser’s Do Not Track
        setting.
      </p>
      <p>
        You can read more about{" "}
        <a href="https://docs.umami.is/docs/faq">Umami’s privacy practices</a>.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about this privacy policy or the data we process, you can reach us
        through the <Link href="/contact">contact form</Link>.
      </p>
    </article>
  )
}

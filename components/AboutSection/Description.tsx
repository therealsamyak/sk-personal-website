import { Link } from "next-view-transitions"

export const Description = () => (
  <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base dark:text-gray-400">
    Full-Stack & Embedded Software Engineer. Passionate about software and business. If you want to
    chat, get in touch{" "}
    <Link
      href="/contact"
      className="underline underline-offset-4 transition-colors hover:text-foreground"
    >
      here
    </Link>
    .
  </p>
)

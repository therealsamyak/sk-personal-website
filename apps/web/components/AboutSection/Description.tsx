import { Link } from "next-view-transitions"

export const Description = () => (
  <p className="mx-auto max-w-[700px] text-zinc-500 text-sm md:text-base dark:text-zinc-400">
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

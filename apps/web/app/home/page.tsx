import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Home | SK - Software Engineer",
  description: "Redirecting to the main portfolio homepage.",
}

const HomePage = () => {
  redirect("/")
}

export default HomePage

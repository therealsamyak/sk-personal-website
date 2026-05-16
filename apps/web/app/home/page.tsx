import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Home",
  description: "Redirecting to main page",
}

const HomePage = () => {
  redirect("/")
}

export default HomePage

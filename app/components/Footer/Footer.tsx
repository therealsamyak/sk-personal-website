import { personalInfo } from "@/config/site"

export const Footer = () => (
  <footer className="border-t h-16 flex-shrink-0">
    <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 h-full sm:px-6 lg:px-6 xl:px-4 2xl:px-2">
      <p className="text-gray-500 text-xs dark:text-gray-400">
        © 2025 {personalInfo.name} All rights reserved.
      </p>
    </div>
  </footer>
)

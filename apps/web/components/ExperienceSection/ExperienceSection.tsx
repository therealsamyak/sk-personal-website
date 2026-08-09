import Image from "next/image"

import { WorkExperienceCarousel } from "./WorkExperienceCarousel"

export const ExperienceSection = () => (
  <div className="mx-auto mt-12 max-w-6xl">
    <div className="grid gap-8 md:grid-cols-2">
      {/* Education Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-center font-semibold text-lg">Education</h4>
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex-1 rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/The_University_of_California_UCLA.svg"
                alt="UCLA Logo"
                title="UCLA Logo - Original by Tiffany & Co., SVG by Casecrer. Public Domain via Wikimedia Commons"
                width={80}
                height={80}
                className="shrink-0 rounded bg-white object-contain"
              />
              <div className="flex-1 flex flex-col gap-2 text-right">
                <h5 className="font-medium">University of California, Los Angeles</h5>
                <p className="text-zinc-600 text-sm dark:text-zinc-400">
                  Masters of Engineering - IoT Systems
                </p>
                <p className="text-zinc-500 text-sm">Sept. 2025 - Sept. 2026</p>
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/5/51/UC_Riverside_seal.svg"
                alt="UCR Logo"
                title="UCR Seal - From UC Riverside Identity Standards Manual. Fair use via Wikipedia"
                width={80}
                height={80}
                className="shrink-0 rounded bg-white object-contain"
              />
              <div className="flex-1 flex flex-col gap-2 text-right">
                <h5 className="font-medium">University of California, Riverside</h5>
                <p className="text-zinc-600 text-sm dark:text-zinc-400">
                  Bachelor's of Science - Computer Science
                </p>
                <p className="text-zinc-500 text-sm">Sept. 2022 - June 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-center font-semibold text-lg">Work Experience</h4>
        <WorkExperienceCarousel />
      </div>
    </div>
  </div>
)

export const ExperienceSection = () => (
  <div className="mx-auto mt-12 max-w-6xl">
    <div className="grid gap-8 md:grid-cols-2">
      {/* Education Section */}
      <div className="flex flex-col space-y-4">
        <h4 className="text-center font-semibold text-lg">Education</h4>
        <div className="flex flex-1 flex-col space-y-3">
          <div className="flex-1 rounded-lg border p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/The_University_of_California_UCLA.svg"
                alt="UCLA Logo"
                title="UCLA Logo - Original by Tiffany & Co., SVG by Casecrer. Public Domain via Wikimedia Commons"
                className="h-20 w-auto flex-shrink-0 object-contain bg-white rounded"
              />
              <div className="flex-1 space-y-2 text-right">
                <h5 className="font-medium">University of California, Los Angeles</h5>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Masters of Engineering - IoT Systems
                </p>
                <p className="text-gray-500 text-sm">Sept. 2025 - Sept. 2026</p>
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-lg border p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/5/51/UC_Riverside_seal.svg"
                alt="UCR Logo"
                title="UCR Seal - From UC Riverside Identity Standards Manual. Fair use via Wikipedia"
                className="h-20 w-auto flex-shrink-0 object-contain bg-white rounded"
              />
              <div className="flex-1 space-y-2 text-right">
                <h5 className="font-medium">University of California, Riverside</h5>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Bachelor's of Science - Computer Science
                </p>
                <p className="text-gray-500 text-sm">Sept. 2022 - June 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="flex flex-col space-y-4">
        <h4 className="text-center font-semibold text-lg">Work Experience</h4>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col rounded-lg border p-4">
            <div className="space-y-2">
              <h5 className="font-medium">Sidecar Health</h5>
              <p className="text-gray-600 text-sm dark:text-gray-400">Software Engineer Intern</p>
              <p className="text-gray-500 text-sm">July - Sept. 2025 | July - Sept. 2024</p>
            </div>
            <ul className="mt-3 flex-1 list-inside list-disc space-y-1 text-gray-600 text-sm dark:text-gray-400">
              <li>Migrated JS to TypeScript, improving performance by 10%</li>
              <li>Migrated Create-React-App to Vite with TailwindCSS</li>
              <li>Wrote unit tests achieving 80% test coverage</li>
              <li>Refactored Redux stores removing ImmutableJS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

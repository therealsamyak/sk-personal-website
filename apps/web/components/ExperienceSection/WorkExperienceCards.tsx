const workExperiences = [
  {
    company: "US Department of the Treasury",
    division: "Treasury Common Services Center (TCSC)",
    title: "AI Engineer",
    dates: "June 2026 - Present",
    highlights: ["Working on a variety of technical projects and modernization efforts."],
  },
  {
    company: "Sidecar Health",
    title: "Software Engineer Intern",
    dates: "July - Sept. 2025 | July - Sept. 2024",
    highlights: [
      "Created a containerized audit automation app in NextJS, speeding up Audit timeline from ~1 week -> ~48 hours.",
      "Utilized AWS ECS, RDS, SDM, Amplify to deploy production applications and container services.",
      "Overhauled authentication framework with WorkOS AuthKit.",
      "Triaged and fixed multiple high-priority bugs in record-time.",
    ],
  },
]

// Render each work experience in its own card.
export const WorkExperienceCards = () => (
  <section aria-labelledby="work-experience-heading" className="flex flex-col gap-4">
    <h2 id="work-experience-heading" className="text-center font-semibold text-lg">
      Work Experience
    </h2>
    <div className="flex flex-col gap-3">
      {workExperiences.map(({ company, division, title, dates, highlights }) => (
        <article className="flex flex-col gap-3 rounded-lg border p-4" key={company}>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">{company}</h3>
            {division && <p className="text-zinc-500 text-sm">{division}</p>}
            <p className="text-zinc-600 text-sm dark:text-zinc-400">{title}</p>
            <p className="text-zinc-500 text-sm">{dates}</p>
          </div>
          <ul className="list-disc space-y-1 pl-5 text-zinc-600 text-sm dark:text-zinc-400">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
)

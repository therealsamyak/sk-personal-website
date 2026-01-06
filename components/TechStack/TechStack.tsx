import { Card } from "../ui/card"
import { getColorClasses, technologies } from "../../config/tech-stack"

export const TechStack = () => (
  <div className="flex flex-wrap justify-center gap-6">
    {technologies.map((tech) => (
      <Card key={tech.category} className="h-60 w-full p-6 sm:h-52 sm:w-80 lg:w-96">
        <h3 className="mb-2 text-center font-semibold text-lg">{tech.category}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {tech.skills.map((skill) => (
            <span
              key={skill}
              className={`inline-flex items-center rounded-md px-2 py-1 font-medium text-sm ring-1 ring-inset ${getColorClasses(tech.color)}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>
    ))}
  </div>
)

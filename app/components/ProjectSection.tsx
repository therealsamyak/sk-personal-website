import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Project, getAllTools } from '../data/portfolio';

interface ProjectSectionProps {
  projects: Project[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const allTools = getAllTools();

  useEffect(() => {
    if (selectedTool) {
      setFilteredProjects(projects.filter(project => 
        project.tools.includes(selectedTool)
      ));
    } else {
      setFilteredProjects(projects);
    }
  }, [selectedTool, projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSection();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateSection = () => {
    const tl = anime.timeline({
      easing: 'easeOutExpo'
    });

    tl.add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600
    })
    .add({
      targets: filterRef.current?.children,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      delay: anime.stagger(50)
    }, '-=300')
    .add({
      targets: projectsRef.current?.children,
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.9, 1],
      duration: 500,
      delay: anime.stagger(100)
    }, '-=200');
  };

  const handleFilterClick = (tool: string | null) => {
    setSelectedTool(tool);
    
    anime({
      targets: projectsRef.current?.children,
      opacity: [1, 0],
      scale: [1, 0.9],
      duration: 300,
      easing: 'easeInQuart',
      complete: () => {
        setTimeout(() => {
          anime({
            targets: projectsRef.current?.children,
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 400,
            easing: 'easeOutBack',
            delay: anime.stagger(80)
          });
        }, 100);
      }
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gray-50 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 opacity-0"
        >
          Featured Projects
        </h2>

        <div 
          ref={filterRef}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <button
            onClick={() => handleFilterClick(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 opacity-0 ${
              selectedTool === null
                ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-300'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            All Projects
          </button>
          {allTools.map((tool) => (
            <button
              key={tool}
              onClick={() => handleFilterClick(tool)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 opacity-0 ${
                selectedTool === tool
                  ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-300'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>

        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 opacity-0 hover:-translate-y-2 group"
            >
              {project.imageUrl && (
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm font-medium hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
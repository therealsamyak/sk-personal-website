import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Employment } from '../data/portfolio';

interface EmploymentSectionProps {
  employment: Employment[];
}

export function EmploymentSection({ employment }: EmploymentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
      targets: timelineRef.current?.children,
      opacity: [0, 1],
      translateX: [-50, 0],
      duration: 600,
      delay: anime.stagger(150)
    }, '-=300');
  };

  const formatYears = (startYear: number, endYear: number | 'Present'): string => {
    return `${startYear} - ${endYear}`;
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-white py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 opacity-0"
        >
          Professional Experience
        </h2>

        <div 
          ref={timelineRef}
          className="relative"
        >
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          {employment.map((job, index) => (
            <div
              key={job.id}
              className="relative pl-20 pb-12 opacity-0"
            >
              <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-125"></div>
              
              <div className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {job.role}
                  </h3>
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {formatYears(job.startYear, job.endYear)}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  {job.company}
                </h4>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
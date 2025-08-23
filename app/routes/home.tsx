import type { Route } from "./+types/home";
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { ProjectSection } from '../components/ProjectSection';
import { EmploymentSection } from '../components/EmploymentSection';
import { ContactSection } from '../components/ContactSection';
import { projects, employment, contactLinks } from '../data/portfolio';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Your Name - Full Stack Developer" },
    { name: "description", content: "Personal portfolio of a passionate full stack developer specializing in modern web technologies." },
    { name: "keywords", content: "developer, full stack, react, typescript, web development" },
    { name: "author", content: "Your Name" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { initSmoothScroll } = useScrollAnimations();

  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, [initSmoothScroll]);

  return (
    <main className="overflow-x-hidden">
      <Header 
        name="Your Name" 
        profileImageUrl="/images/profile.jpg"
      />
      <ProjectSection projects={projects} />
      <EmploymentSection employment={employment} />
      <ContactSection contactLinks={contactLinks} />
    </main>
  );
}

import { useEffect, useCallback } from 'react';
import anime from 'animejs';

export function useScrollAnimations() {
  const animateOnScroll = useCallback((target: HTMLElement, options: any = {}) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              ...options,
              easing: options.easing || 'easeOutExpo',
              duration: options.duration || 800
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: options.threshold || 0.2,
        rootMargin: options.rootMargin || '0px'
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const initSmoothScroll = useCallback(() => {
    let isScrolling = false;
    
    const handleScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          const sections = document.querySelectorAll('section');
          const scrollPosition = window.scrollY + window.innerHeight / 2;
          
          sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              section.classList.add('active-section');
            } else {
              section.classList.remove('active-section');
            }
          });
          
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    animateOnScroll,
    initSmoothScroll
  };
}
import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface HeaderProps {
  name: string;
  profileImageUrl?: string;
}

export function Header({ name, profileImageUrl }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        delay: 300
      });

      tl.add({
        targets: imageRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800
      })
      .add({
        targets: nameRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
      }, '-=400');
    }
  }, []);

  return (
    <div 
      ref={headerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <div className="flex flex-col items-center space-y-8">
        <div 
          ref={imageRef}
          className="relative opacity-0"
        >
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={`${name} profile`}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20 shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white/20 shadow-2xl transition-transform duration-300 hover:scale-105">
              <span className="text-4xl md:text-5xl font-bold text-white select-none">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 animate-pulse pointer-events-none"></div>
        </div>
        
        <h1 
          ref={nameRef}
          className="text-4xl md:text-6xl font-bold text-center opacity-0 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {name}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl px-4 font-medium tracking-wide">
          Full Stack Developer & Creative Problem Solver
        </p>
      </div>
    </div>
  );
}
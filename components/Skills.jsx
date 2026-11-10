'use client';

import { useEffect, useState } from 'react';
import CircularGallery from './CircularGallery';

const skills = [
  {
    image: 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/nextjs/nextjs-original.svg',
    text: 'Next.js',
    description:
      'React framework for building fast, scalable, and production-ready full-stack web applications.'
  },
  {
    image: 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/react/react-original.svg',
    text: 'React',
    description:
      'JavaScript library for building interactive, reusable, and component-based user interfaces.'
  },
  {
    image: 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/tailwindcss/tailwindcss-original.svg',
    text: 'Tailwind CSS',
    description:
      'Utility-first CSS framework for creating responsive and modern interfaces with flexible styling.'
  },
  {
    image: 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/laravel/laravel-original.svg',
    text: 'Laravel',
    description:
      'Modern PHP framework for developing clean, secure, maintainable, and scalable web applications.'
  },
  {
    image: 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/flutter/flutter-original.svg',
    text: 'Flutter',
    description:
      'Cross-platform UI framework for creating beautiful and responsive mobile applications from one codebase.'
  },
  {
    image: 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/figma/figma-original.svg',
    text: 'Figma',
    description:
      'Collaborative design and prototyping tool for creating polished interfaces, wireframes, and user experiences.'
  }
];

const GALLERY_CONFIG = {
  sm: { bend: 1, scrollSpeed: 1.7, scrollEase: 0.08 },
  md: { bend: 1.5, scrollSpeed: 1.6, scrollEase: 0.06 },
  lg: { bend: 2, scrollSpeed: 1.8, scrollEase: 0.05 }
};

const getBreakpoint = () => {
  const w = window.innerWidth;
  if (w < 640) return 'sm';
  if (w < 1024) return 'md';
  return 'lg';
};

const Skills = () => {
  const [breakpoint, setBreakpoint] = useState(null);

  useEffect(() => {
    const update = () => {
      const next = getBreakpoint();
      setBreakpoint((prev) => (prev === next ? prev : next));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const config = breakpoint ? GALLERY_CONFIG[breakpoint] : null;

  return (
    <section
      className="
        min-h-0
        sm:min-h-screen
        bg-black
        rounded-t-[50px]
        sm:rounded-t-[70px]
        -mt-[50px]
        sm:-mt-[70px]
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
        px-0
        pt-20
        pb-10
        sm:py-16
        sm:px-6
        lg:px-8
      "
    >
      <div className="text-center mb-6 sm:mb-16 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
          Skills
        </h2>

        <div className="w-12 h-[3px] bg-white mx-auto mb-4" />

        <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-light px-4">
          Focused expertise in modern tools & frameworks
        </p>
      </div>

      <div
        className="
          relative
          w-full
          max-w-[1200px]
          h-[340px]
          sm:h-[480px]
          lg:h-[600px]
        "
      >
        {config && (
          <CircularGallery
            items={skills}
            bend={config.bend}
            textColor="#f4f4f4"
            fontUrl="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
            scrollSpeed={config.scrollSpeed}
            scrollEase={config.scrollEase}
          />
        )}
      </div>
    </section>
  );
};

export default Skills;
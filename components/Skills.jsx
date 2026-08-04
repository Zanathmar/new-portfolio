'use client';

import CircularGallery from './CircularGallery';

const skills = [
  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/nextjs/nextjs-original.svg',
    text: 'Next.js',
    description:
      'React framework for building fast, scalable, and production-ready full-stack web applications.'
  },

  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/react/react-original.svg',
    text: 'React',
    description:
      'JavaScript library for building interactive, reusable, and component-based user interfaces.'
  },

  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/tailwindcss/tailwindcss-original.svg',
    text: 'Tailwind CSS',
    description:
      'Utility-first CSS framework for creating responsive and modern interfaces with flexible styling.'
  },

  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/laravel/laravel-original.svg',
    text: 'Laravel',
    description:
      'Modern PHP framework for developing clean, secure, maintainable, and scalable web applications.'
  },

  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/flutter/flutter-original.svg',
    text: 'Flutter',
    description:
      'Cross-platform UI framework for creating beautiful and responsive mobile applications from one codebase.'
  },

  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/figma/figma-original.svg',
    text: 'Figma',
    description:
      'Collaborative design and prototyping tool for creating polished interfaces, wireframes, and user experiences.'
  }
];

const Skills = () => {
  return (
    <section
  className="
    min-h-screen
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
    py-16
    sm:px-6
    lg:px-8
  "
>
      {/* HEADER */}

      <div
        className="
          text-center
          mb-10
          sm:mb-16
          max-w-2xl
        "
      >
        <h2
          className="
            text-3xl
            sm:text-4xl
            lg:text-6xl
            font-bold
            text-white
            mb-3
            tracking-tight
          "
        >
          Skills
        </h2>

        <div
          className="
            w-12
            h-[3px]
            bg-white
            mx-auto
            mb-4
          "
        />

        <p
          className="
            text-gray-400
            text-sm
            sm:text-base
            lg:text-lg
            font-light
            px-4
          "
        >
          Focused expertise in modern tools & frameworks
        </p>
      </div>

      {/* GALLERY */}

      <div
        className="
          w-full
          max-w-[1200px]
        "
        style={{
          height: '600px',
          position: 'relative'
        }}
      >
        <CircularGallery
          items={skills}
          bend={2}
          textColor="#f4f4f4"
          borderRadius={0.08}
          fontUrl="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          scrollSpeed={1.5}
          scrollEase={0.04}
        />
      </div>
    </section>
  );
};

export default Skills;
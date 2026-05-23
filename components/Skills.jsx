'use client';

import { useState, useEffect } from 'react';
import { Award, Calendar, Code } from 'lucide-react';

const Skills = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 6);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const getProficiencyLevel = (percentage) => {
    if (percentage >= 80) return { label: 'Advanced', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' };
    if (percentage >= 60) return { label: 'Intermediate', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    return { label: 'Beginner', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' };
  };

  const skills = [
    { id: 'nextjs', name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', description: 'Built-in SSR, routing, and seamless deployment make it ideal for production-grade web development.', details: 'Built-in SSR, routing, and seamless deployment make it ideal for production-grade web development.', proficiency: 60, experience: '1+ yrs', projects: 2, category: 'Full-stack' },
    { id: 'react', name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description: 'Modern UI library for interactive apps.', details: 'Reusable components and hooks for scalable front-end solutions.', proficiency: 60, experience: '1+ yrs', projects: 3, category: 'Frontend' },
    { id: 'tailwind', name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', description: 'Utility-first framework for custom designs.', details: 'Lets developers build responsive UI fast with minimal code.', proficiency: 90, experience: '1+ yrs', projects: 5, category: 'Styling' },
    { id: 'laravel', name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', description: 'PHP framework for clean backend systems.', details: 'Elegant syntax for API-driven applications with built-in authentication.', proficiency: 60, experience: '1+ yrs', projects: 3, category: 'Backend' },
    { id: 'flutter', name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', description: 'Cross-platform toolkit for mobile apps.', details: 'Single codebase for Android & iOS with smooth performance.', proficiency: 60, experience: '3+ mos', projects: 1, category: 'Mobile' },
    { id: 'figma', name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', description: 'Collaborative tool for UI/UX design.', details: 'Design, prototype, and collaborate in real time.', proficiency: 60, experience: '6+ mos', projects: 4, category: 'Design' },
  ];

  const getCustomColSpan = (index) => {
    const customSpans = { 0: 'md:col-span-3', 1: 'md:col-span-2', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-3', 5: 'md:col-span-2' };
    return customSpans[index];
  };

  return (
    <section id="skills" className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-3 tracking-tight">Skills</h2>
        <div className="w-12 h-[3px] bg-black mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-light px-4">Focused expertise in modern tools & frameworks</p>
      </div>

      <div className="w-full max-w-[1200px]">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-4 auto-rows-[minmax(200px,auto)] sm:auto-rows-[minmax(220px,240px)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {skills.map((skill, index) => {
            const proficiencyInfo = getProficiencyLevel(skill.proficiency);
            return (
              <div
                key={index}
                className={`${getCustomColSpan(index)} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-300`}
                style={{ transitionDelay: `${index * 100}ms`, zIndex: activeCard === index ? 10 : 1 }}
              >
                <div className="h-full bg-white border border-gray-200 rounded-3xl sm:rounded-[40px] p-4 sm:p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 relative overflow-hidden">
                  <div className="grid grid-cols-[auto,1fr] sm:grid-cols-[auto,1fr] gap-4 sm:gap-6 items-center h-full">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-50 rounded-2xl sm:rounded-3xl md:rounded-[34px] border border-gray-200 hover:border-gray-300 transition-all duration-300 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={skill.icon} alt={skill.name} className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center h-full space-y-1 sm:space-y-1 min-w-0">
                      <div className="inline-flex items-center px-2 py-0.5 bg-gray-100 rounded-full w-fit">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700 uppercase">{skill.category}</span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-light text-black tracking-tight truncate">{skill.name}</h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 font-light line-clamp-2 sm:line-clamp-3">{skill.description}</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                        <div className={`flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border ${proficiencyInfo.bgColor} ${proficiencyInfo.borderColor}`}>
                          <Award className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${proficiencyInfo.color} flex-shrink-0`} />
                          <span className={`text-[10px] sm:text-xs font-medium ${proficiencyInfo.color} whitespace-nowrap`}>{proficiencyInfo.label}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                          <span className="text-[10px] sm:text-xs text-gray-700 font-medium whitespace-nowrap">{skill.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Code className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                          <span className="text-[10px] sm:text-xs text-gray-700 font-medium whitespace-nowrap">{skill.projects} projects</span>
                        </div>
                      </div>
                      {activeCard === index && (
                        <div className="mt-2 text-[10px] sm:text-xs text-gray-600 leading-relaxed font-light transition-opacity duration-500 hidden sm:block">
                          <p className="mb-2">{skill.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;

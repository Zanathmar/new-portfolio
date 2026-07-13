'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';

const projects = [
  { title: "Escape Website", description: "Built a full-stack Islamic podcast and event platform (Next.js, Supabase, Tailwind CSS, TypeScript)", image: "/assets/images/project5.png", github: "https://github.com/akmallfhn/escape", tech: ["Next.js", "Tailwind CSS", "Supabase"] },
  { title: "Portfolio Website", description: "My previous personal portfolio website built using HTML, CSS and JavaScript", image: "/assets/images/project1.png", github: "#", tech: ["HTML", "CSS", "JavaScript"] },
  { title: "Expense Tracker App", description: "A modern expense tracker application with user authentication, category management, and real-time analytics.", image: "/assets/images/project2.png", github: "https://github.com/Zanathmar/CuanKu", tech: ["Laravel", "Inertia", "Tailwind CSS", "MySql"] },
  { title: "E-Library App", description: "A modern e-library application with user authentication, book search, and real-time book management.", image: "/assets/images/project3.png", github: "https://github.com/Zanathmar/e-library-skl", tech: ["Laravel", "Tailwind CSS", "MySql"] },
  { title: "Payroll App", description: "A modern payroll application with user authentication, employee management, and real-time analytics.", image: "/assets/images/project4.png", github: "https://github.com/Zanathmar/Payroll-app", tech: ["Laravel", "Tailwind CSS", "MySql"] },
];

const ProjectCard = ({ project, index }) => (
  <div className="flex flex-col rounded-3xl border-2 border-primary-black shadow-[0px_5px_0px_0px_rgba(0,0,0,1)] bg-white" style={{ aspectRatio: '4/5' }}>
    <div className="w-full flex-shrink-0 p-3 pb-0">
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute top-3 left-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1">
          <span className="text-white font-mono text-xs font-semibold tracking-widest uppercase">
            Project {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3 p-5 flex-1 min-h-0">
      <h3 className="font-black text-lg leading-tight tracking-tight">{project.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1 overflow-hidden">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-black hover:text-white transition-all duration-200">{tech}</span>
        ))}
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full py-3 border-2 border-black rounded-2xl text-black text-sm font-semibold shadow-[0px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px] transition-all duration-200">
        <Github size={16} />
        View Source
      </a>
    </div>
  </div>
);

const Projects = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState(null);
  const n = projects.length;

  const desktopCards = [0, 1, 2].map((offset) => {
    const idx = (startIndex + offset) % n;
    return { project: projects[idx], originalIndex: idx };
  });

  const navigate = (newIndex, dir) => {
    setDirection(dir);
    setVisible(false);
    setTimeout(() => {
      setStartIndex(((newIndex % n) + n) % n);
      setVisible(true);
    }, 300);
  };

  const prev = () => navigate(startIndex - 1, 'right');
  const next = () => navigate(startIndex + 1, 'left');
  const goTo = (i) => navigate(i, i > startIndex ? 'left' : 'right');

  const slideStyle = {
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : direction === 'left' ? 'translateX(-24px)' : 'translateX(24px)',
  };

  return (
    <section id="projects" className="px-4 py-20 tablet:px-6 desktop:px-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl desktop:text-7xl font-light tracking-tight mb-6">
            Featured{' '}
            <span className="font-black bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">A collection of my recent work showcasing modern web development practices</p>
        </div>

        <div className="hidden tablet:grid tablet:grid-cols-3 gap-6" style={slideStyle}>
          {desktopCards.map(({ project, originalIndex }) => (
            <ProjectCard key={`${originalIndex}-${startIndex}`} project={project} index={originalIndex} />
          ))}
        </div>

        <div className="tablet:hidden" style={slideStyle}>
          <ProjectCard project={projects[startIndex]} index={startIndex} />
        </div>

        <div className="flex items-center justify-center gap-5 mt-12">
          <button onClick={prev} className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-black text-sm font-semibold shadow-[0px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px] transition-all duration-200">
            <ChevronLeft size={18} /> Prev
          </button>
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${i === startIndex ? 'w-8 h-3 bg-black' : 'w-3 h-3 bg-gray-300 hover:bg-gray-500'}`} />
            ))}
          </div>
          <button onClick={next} className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-black text-sm font-semibold shadow-[0px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px] transition-all duration-200">
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

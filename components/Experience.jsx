'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Calendar, MapPin, ChevronRight } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => { setIsVisible(true); }, []);

  const experiences = [
    { company: "SMP Islam El-Rasyad Jakarta", role: "IT Trainer", period: "November 2024", type: "Volunteer", description: "Instructed 1 class including more than 20 students in fundamental web development using HTML, CSS, and JavaScript for 1 week", students: "20+", classes: 1, duration: "1 week", technologies: ["HTML", "CSS", "JavaScript"] },
    { company: "SMAN 78 Jakarta", role: "IT Trainer", period: "February 2025", type: "Volunteer", description: "Instructed 10 classes including more than 110 students in fundamental web development using HTML, CSS, and JavaScript for 1 week", students: "110+", classes: 10, duration: "1 week", technologies: ["HTML", "CSS", "JavaScript"] },
    { company: "Pondok Pesantren Qurrota A'yun", role: "IT Trainer", period: "March 2025", type: "Volunteer", description: "Instructed 6 classes including more than 80 students in fundamental web development using HTML, CSS, and JavaScript for 1 week", students: "80+", classes: 6, duration: "1 week", technologies: ["HTML", "CSS", "JavaScript"] },
    { company: "SMAN 8 Jakarta", role: "IT Trainer", period: "May 2025", type: "Volunteer", description: "Instructed 7 classes including more than 100 students in fundamental web development using HTML, CSS, and JavaScript for 1 week.", students: "100+", classes: 7, duration: "1 week", technologies: ["HTML", "CSS", "JavaScript"] },
  ];

  return (
    <section id="experiences" className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center px-4 py-12 sm:py-16 lg:px-8">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-3 tracking-tight">Experience</h2>
        <div className="w-12 h-[3px] bg-black mx-auto mb-4"></div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-light px-4">Empowering students through tech education</p>
      </div>

      <div className="w-full max-w-4xl">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 hidden md:block" style={{ left: '2rem' }}></div>
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} transition-all duration-500`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute left-0 top-8 w-4 h-4 bg-white border-2 border-black rounded-full hidden md:block" style={{ left: '1.5rem' }}></div>
                <div className="md:ml-20 bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className={`h-1 bg-gradient-to-r from-black to-gray-400 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black text-white text-[10px] sm:text-xs font-medium rounded-full uppercase tracking-wide">{exp.type}</span>
                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {exp.period}
                          </div>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-1 group-hover:translate-x-1 transition-transform duration-300">{exp.role}</h3>
                        <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex gap-3 sm:gap-4 self-start">
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold text-black">{exp.students}</div>
                          <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Students</div>
                        </div>
                        <div className="w-px bg-gray-200"></div>
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold text-black">{exp.classes}</div>
                          <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Classes</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech, techIdx) => (
                        <span key={techIdx} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 text-gray-800 text-[10px] sm:text-xs font-medium rounded border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-[10px] sm:text-xs text-gray-500">
                      <BookOpen className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span>Duration: {exp.duration}</span>
                    </div>
                    <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ${hoveredIndex === index ? 'translate-x-1' : ''} transition-transform duration-300`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="text-center p-4 sm:p-5 lg:p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1">310+</div>
            <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Total Students</div>
          </div>
          <div className="text-center p-4 sm:p-5 lg:p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1">24</div>
            <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Classes Taught</div>
          </div>
          <div className="text-center p-4 sm:p-5 lg:p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1">4</div>
            <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Institutions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

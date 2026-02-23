'use client';

import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky w-full top-0 left-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center lg:grid lg:grid-cols-3 px-6 py-4 lg:px-8">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-black tracking-tight">
            Zanathmar.
          </span>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-1">
          {['Home', 'Skills', 'Projects', 'Experiences', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-black group"
            >
              <span className="relative z-10">{item}</span>
              <div className="absolute inset-0 bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2"></div>
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <a
            href="/assets/resume.pdf"
            download
            className="hidden lg:flex relative px-6 py-3 border-2 border-black rounded-lg items-center justify-center text-black font-medium overflow-hidden group transition-all duration-300 hover:border-black"
          >
            <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
            <span className="flex flex-row gap-2 relative z-10 group-hover:text-white transition-colors duration-300">
              Resume
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </span>
          </a>

          <button
            onClick={toggleMenu}
            className="lg:hidden relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-between w-6 h-5">
              <span className={`block h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-8'}`} />
              <span className={`block h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100 group-hover:w-6'}`} />
              <span className={`block h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-4'}`} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl transform transition-all duration-500 ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-8 opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-2 py-8 px-6">
          {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`w-full text-center py-3 px-4 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-black transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}
            >
              {item}
            </a>
          ))}
          
          <a
            href="/assets/resume.pdf"
            download
            className={`mt-4 w-full relative border-2 border-black rounded-lg px-6 py-4 flex items-center justify-center text-black font-semibold overflow-hidden group transition-all duration-300 transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
          >
            <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
            <span className="flex flex-row gap-2 relative z-10 group-hover:text-white transition-colors duration-300">
              Download Resume
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

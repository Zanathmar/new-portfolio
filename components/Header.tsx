'use client';

import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${
        scrolled ? 'p-4 sm:p-10' : 'p-0'
      }`}
    >
      <header
        className={`font-jakarta pointer-events-auto w-full bg-white transition-all duration-500 ease-in-out hover:-translate-y-0.5 ${
          scrolled
            ? `max-w-4xl border-[3px] border-black shadow-[0px_6px_0px_#000] hover:shadow-[0px_8px_0px_#000] ${
                isMenuOpen ? 'rounded-[24px]' : 'rounded-[50px]'
              }`
            : 'max-w-full rounded-none border-b-[3px] border-black hover:shadow-[0_4px_0px_#000]'
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 gap-2">
          <a
            href="#home"
            className="flex-shrink-0 font-bold text-lg tracking-tight text-black whitespace-nowrap"
          >
            Zanathmar
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {['Home', 'Skills', 'Projects', 'Experiences', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 text-[#1a1a1a] font-bold transition-all duration-300 hover:text-black group"
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="/assets/resume.pdf"
              download
              className="hidden lg:flex relative items-center gap-2 text-xs font-bold uppercase tracking-wider text-black px-5 py-2.5 rounded-full border-[2.5px] border-black overflow-hidden group transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Resume
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </span>
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex-shrink-0 p-2.5 rounded-full border-2 border-black transition-all duration-300 hover:bg-black hover:text-white"
              aria-label="Toggle menu"
            >
              <div className="relative flex items-center justify-center w-5 h-4">
                <span
                  className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-[7px]'
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-[7px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden grid transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <nav 
              className={`flex flex-col gap-1 px-6 pb-6 border-t-[2px] border-black mt-1 pt-4 transition-all duration-500 ease-in-out ${
                isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
            >
              {['Home', 'Skills', 'Projects', 'Experiences', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="relative px-4 py-3 text-gray-700 font-medium text-center transition-all duration-300 hover:text-black group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2" />
                </a>
              ))}

              <a
                href="/assets/resume.pdf"
                download
                className="mt-2 relative flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-black px-5 py-3 rounded-full border-[2.5px] border-black overflow-hidden group transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Download Resume
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </span>
              </a>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

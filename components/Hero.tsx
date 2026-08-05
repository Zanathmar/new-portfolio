'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const socials = [
  {
    href: 'https://linkedin.com/in/zanathmar',
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    href: 'https://github.com/zanathmar',
    label: 'GitHub',
    path: 'M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
  },
  {
    href: 'https://youtube.com/@zanathmar',
    label: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    href: 'https://instagram.com/zanathmar',
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
];

const greetings = ['Hello', 'Hola', 'Bonjour', 'مرحبا', 'こんにちは'];

const Hero = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const offset = -section.getBoundingClientRect().top;

      if (headingRef.current) {
        headingRef.current.style.transform = `translateY(${offset * 0.08}px)`;
      }
      if (imageRef.current) {
        imageRef.current.style.transform = `translate(-50%, -50%) translateY(${offset * -0.22}px)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative bg-[#f3f3f3] px-4 pt-8 pb-8 tablet:px-6 tablet:pt-12 tablet:pb-16 desktop:px-20 desktop:pt-16 desktop:pb-24 overflow-hidden"
    >
      <div className="font-jakarta text-[11px] tablet:text-sm desktop:text-base flex items-center justify-center gap-2 mb-4 tablet:mb-6 text-black">
        <span
          className={`font-bold inline-block transition-all duration-300 ${
            isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {greetings[currentGreeting]}
        </span>
        <span>, I&apos;m Izzan.</span>
      </div>

      {/* mobile layout: text above, image big in the middle, text below */}
      <div className="min-[768px]:hidden flex flex-col items-center">
        <h1 className="font-serif text-[15vw] font-bold leading-[0.95] text-center text-black select-none">
          Software
        </h1>

        <div className="relative w-[58vw] max-w-[280px] shrink-0 mx-auto my-5">
          <div className="border-2 border-primary-black rounded-2xl overflow-hidden shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
            <Image
              src="/assets/Profile.png"
              alt="Profile"
              width={400}
              height={480}
              className="w-full h-auto aspect-[4/5] object-cover"
              priority
            />
          </div>
          <div className="absolute -top-2 -right-4 bg-white border-2 border-primary-black rounded-full px-2.5 py-1 text-[11px] font-semibold text-black shadow-[0px_2px_0px_0px_rgba(0,0,0,1)]">
            hello
          </div>
        </div>

        <h1 className="font-serif text-[15vw] font-bold leading-[0.95] text-center text-black select-none">
          Developer
        </h1>
      </div>

      {/* tablet/desktop: original overlapping parallax layout */}
      <div className="hidden min-[768px]:block relative">
        <h1
          ref={headingRef}
          className="font-serif tablet:text-8xl desktop:text-[13rem] font-bold leading-none text-center text-black select-none will-change-transform"
        >
          <span className="block">Software</span>
          <span className="block mt-4 desktop:mt-6">Developer</span>
        </h1>

        <div
          ref={imageRef}
          className="absolute left-1/2 top-1/2 w-52 will-change-transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="border-2 border-primary-black rounded-2xl overflow-hidden shadow-[0px_7px_0px_0px_rgba(0,0,0,1)] bg-white">
            <Image
              src="/assets/Profile.png"
              alt="Profile"
              width={400}
              height={480}
              className="w-full h-auto aspect-[4/5] object-cover"
              priority
            />
          </div>
          <div className="absolute -top-4 -right-10 bg-white border-2 border-primary-black rounded-full px-4 py-1.5 text-sm font-semibold text-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
            hello
          </div>
        </div>
      </div>

      <div className="flex flex-col tablet:flex-row items-center justify-center gap-2.5 tablet:gap-6 mt-6 tablet:mt-10 font-jakarta text-[11px] tablet:text-sm text-primary-black">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true">&#9670;</span> Based in Indonesia
        </span>

        <div className="flex gap-2 tablet:gap-3">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-7 h-7 tablet:w-10 tablet:h-10 flex items-center justify-center rounded-full border-2 border-primary-black bg-primary-black text-white hover:bg-white hover:text-primary-black transition-colors duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="tablet:w-4 tablet:h-4">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>

        <span className="flex items-center gap-1.5">
          Available for work
          <span className="w-2 h-2 rounded-full bg-primary-black inline-block" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
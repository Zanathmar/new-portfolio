'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, Building2, Calendar, Clock, Image as ImageIcon } from 'lucide-react';

interface Entry {
  title: string;
  org: string;
  type: string;
  start: string;
  end: string;
  period: string;
  duration: string;
  description: string;
  technologies: string[];
  students?: string;
  classes?: number;
  image?: string;
}

const trainerTech = ['HTML', 'CSS', 'JavaScript'];

const entries: Entry[] = [
  {
    title: 'Junior Consultant',
    org: 'Veda Praxis',
    type: 'Internship',
    start: '2026-11-01',
    end: '2027-02-28',
    period: 'Nov 2026 - Feb 2027',
    duration: '3 months',
    description: 'Currently ongoing. Project details will be added soon.',
    technologies: [],
    image: '/assets/images/veda.png',
  },
  {
    title: 'Information System Intern',
    org: 'Kementerian Komunikasi dan Digital (Komdigi)',
    type: 'Internship',
    start: '2026-08-01',
    end: '2026-10-31',
    period: 'Aug 2026 - Oct 2026',
    duration: '3 months',
    description: 'Developing internal information systems as part of the Sistem Informasi division.',
    technologies: [],
    image: 'assets/images/komdigi.png',
  },
  {
    title: 'IT Trainer',
    org: 'SMAN 17 Jakarta',
    type: 'Volunteer',
    start: '2026-05-01',
    end: '2026-05-31',
    period: 'May 2026',
    duration: '1 week',
    description:
      'Instructed 6 classes including more than 150 students in fundamental web development using HTML, CSS, and JavaScript for 1 week.',
    technologies: trainerTech,
    students: '150+',
    classes: 6,
    image: 'assets/images/sman17.png',
  },
  {
    title: 'IT Trainer',
    org: 'SMAN 8 Jakarta',
    type: 'Volunteer',
    start: '2025-05-01',
    end: '2025-05-31',
    period: 'May 2025',
    duration: '1 week',
    description:
      'Instructed 7 classes including more than 100 students in fundamental web development using HTML, CSS, and JavaScript for 1 week.',
    technologies: trainerTech,
    students: '100+',
    classes: 7,
    image: 'assets/images/sman8.png',
  },
  {
    title: 'IT Trainer',
    org: 'SMAN 78 Jakarta',
    type: 'Volunteer',
    start: '2025-02-01',
    end: '2025-02-28',
    period: 'February 2025',
    duration: '1 week',
    description:
      'Instructed 10 classes including more than 110 students in fundamental web development using HTML, CSS, and JavaScript for 1 week.',
    technologies: trainerTech,
    students: '110+',
    classes: 10,
    image: 'assets/images/sman78.png',
  },
  {
    title: 'IT Trainer',
    org: 'SMP Islam El-Rasyad Jakarta',
    type: 'Volunteer',
    start: '2024-11-01',
    end: '2024-11-30',
    period: 'November 2024',
    duration: '1 week',
    description:
      'Instructed 1 class including more than 20 students in fundamental web development using HTML, CSS, and JavaScript for 1 week.',
    technologies: trainerTech,
    students: '20+',
    classes: 1,
    image: 'assets/images/elrasyad.png',
  },
];

const yearLabel = (start: string, end: string) => {
  const s = start.slice(0, 4);
  const e = end.slice(0, 4);
  return s === e ? s : `${s}-${e.slice(2)}`;
};

const shadowIdle = 'shadow-[0_4px_0_0_rgba(0,0,0,1)]';
const shadowActive = '-translate-y-[8px] shadow-[0_8px_0_0_rgba(0,0,0,1)]';

const Heading = () => (
  <div>
    <h2 className="text-display font-light tracking-tight mb-4">
      <span className="block">My</span>
      <span className="block font-black">Experience</span>
    </h2>
    <div className="w-10 h-[2px] bg-black mb-3" />
    <p className="text-zinc-500 text-p2 max-w-sm">Professional work and community teaching</p>
  </div>
);

const Meta = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <div className="flex items-center gap-2 text-p2 text-zinc-500">
    <span className="shrink-0">{icon}</span>
    <span>{children}</span>
  </div>
);

const Badge = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black text-p2 font-semibold ${className}`}>
    {children}
  </span>
);

interface CardProps {
  entry: Entry;
  active: boolean;
  current: boolean;
  className: string;
  isMobile?: boolean;
}

const Card = ({ entry, active, current, className, isMobile = false }: CardProps) => {
  // Desktop horizontal layout
  if (!isMobile) {
    return (
      <article
        data-card
        className={`relative flex shrink-0 bg-white border border-black rounded-2xl p-6 lg:p-8 transition-all duration-300 ease-out ${
          active ? shadowActive : shadowIdle
        } ${className}`}
      >
        <div className="flex gap-6 lg:gap-8">
          {/* Left sidebar: year + image + badges */}
          <div className="flex flex-col items-center justify-start gap-4 shrink-0 w-[160px] lg:w-[180px] border-r border-black pr-6 lg:pr-8">
            <span
              aria-hidden="true"
              className="font-black text-heading-1 lg:text-display leading-none tracking-tight text-black writing-vertical-lr text-center w-full"
              style={{ lineHeight: 1 }}
            >
              {yearLabel(entry.start, entry.end)}
            </span>
            
            {entry.image && (
              <div className="relative w-full aspect-square">
                <img
                  src={entry.image}
                  alt={`${entry.org} logo`}
                  className={`w-full h-full object-cover rounded-xl border border-black grayscale transition-all duration-300 ${
                    active ? 'grayscale-0' : ''
                  }`}
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex flex-col gap-2 mt-auto w-full">
              <Badge>{entry.type}</Badge>
              {current && (
                <Badge className="bg-black text-white w-full justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 motion-safe:animate-pulse" aria-hidden="true" />
                  Current
                </Badge>
              )}
            </div>
          </div>

          {/* Right content */}
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="font-black text-heading-2 lg:text-heading-1 leading-tight tracking-tight mb-3">{entry.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Meta icon={<Building2 size={16} />}>{entry.org}</Meta>
              <Meta icon={<Calendar size={16} />}>{entry.period}</Meta>
              <Meta icon={<Clock size={16} />}>{entry.duration}</Meta>
            </div>

            {entry.students && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="border border-black rounded-xl py-3 text-center">
                  <div className="font-black text-heading-3 leading-none">{entry.students}</div>
                  <div className="mt-0.5 text-p2 text-zinc-500">Students</div>
                </div>
                <div className="border border-black rounded-xl py-3 text-center">
                  <div className="font-black text-heading-3 leading-none">{entry.classes}</div>
                  <div className="mt-0.5 text-p2 text-zinc-500">Classes</div>
                </div>
              </div>
            )}

            <p className="text-zinc-500 text-p2 leading-relaxed flex-1">{entry.description}</p>

            {entry.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {entry.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-zinc-100 text-zinc-700 text-p2 font-medium rounded-full hover:bg-black hover:text-white transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Mobile vertical layout
  return (
    <article
      data-card
      className={`relative flex flex-col bg-white border border-black rounded-2xl p-6 transition-all duration-300 ease-out ${
        active ? shadowActive : shadowIdle
      } ${className}`}
    >
      {/* Header: Year + badges in same row with hierarchy */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div
          aria-hidden="true"
          className="font-black text-heading-1 leading-none tracking-tight text-black shrink-0"
        >
          {yearLabel(entry.start, entry.end)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{entry.type}</Badge>
          {current && isMobile && (
            <span 
              className="w-3 h-3 rounded-full bg-green-400 motion-safe:animate-pulse"
              aria-label="Current position"
              title="Current position"
            />
          )}
          {current && !isMobile && (
            <Badge className="bg-black text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 motion-safe:animate-pulse" aria-hidden="true" />
              Current
            </Badge>
          )}
        </div>
      </div>

      {/* Organization image centered */}
      {entry.image && (
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24 aspect-square">
            <img
              src={entry.image}
              alt={`${entry.org} logo`}
              className={`w-full h-full object-cover rounded-xl border border-black grayscale transition-all duration-300 ${
                active ? 'grayscale-0' : ''
              }`}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="font-black text-heading-2 leading-tight tracking-tight mb-3">{entry.title}</h3>
      
      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Meta icon={<Building2 size={16} />}>{entry.org}</Meta>
        <Meta icon={<Calendar size={16} />}>{entry.period}</Meta>
        <Meta icon={<Clock size={16} />}>{entry.duration}</Meta>
      </div>

      {/* Stats */}
      {entry.students && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="border border-black rounded-xl py-3 text-center">
            <div className="font-black text-heading-3 leading-none">{entry.students}</div>
            <div className="mt-0.5 text-p2 text-zinc-500">Students</div>
          </div>
          <div className="border border-black rounded-xl py-3 text-center">
            <div className="font-black text-heading-3 leading-none">{entry.classes}</div>
            <div className="mt-0.5 text-p2 text-zinc-500">Classes</div>
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-zinc-500 text-p2 leading-relaxed flex-1">{entry.description}</p>

      {/* Technologies */}
      {entry.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {entry.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-zinc-100 text-zinc-700 text-p2 font-medium rounded-full hover:bg-black hover:text-white transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

const Experience = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!wrap || !stage || !track) return;

    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    let raf = 0;
    let last = 0;
    let current = 0;
    let distance = 0;
    let shown = -1;
    let centers: number[] = [];

    const target = () => {
      if (distance <= 0) return 0;
      const top = wrap.getBoundingClientRect().top;
      return Math.min(Math.max(-top / distance, 0), 1);
    };

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const x = Math.round(-current * distance * dpr) / dpr;
      track.style.transform = `translate3d(${x}px, 0, 0)`;

      if (centers.length === 0) return;
      const mid = -x + window.innerWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      centers.forEach((c, i) => {
        const d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (best !== shown) {
        shown = best;
        setActive(best);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = target();
      const diff = t - current;
      if (Math.abs(diff) < 0.0002) {
        current = t;
      } else {
        current += diff * (1 - Math.exp(-dt * 8));
      }
      render();
      raf = current === t ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (raf || !mq.matches) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const measure = (snap: boolean) => {
      if (!mq.matches) {
        wrap.style.height = '';
        track.style.transform = '';
        distance = 0;
        centers = [];
        return;
      }
      distance = Math.max(track.offsetWidth - window.innerWidth, 0);
      wrap.style.height = `${stage.offsetHeight + distance}px`;
      centers = Array.from(track.querySelectorAll<HTMLElement>('[data-card]')).map(
        (el) => el.offsetLeft + el.offsetWidth / 2
      );
      if (snap) {
        current = target();
        render();
      } else {
        kick();
      }
    };

    const onResize = () => measure(false);
    const onMedia = () => measure(true);

    measure(true);

    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    ro.observe(stage);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    mq.addEventListener('change', onMedia);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', onMedia);
      wrap.style.height = '';
      track.style.transform = '';
    };
  }, []);

  const isCurrent = (entry: Entry) => today !== null && today >= entry.start && today <= entry.end;

  return (
    <section id="experiences" aria-label="Experience" className="bg-zinc-100">
      <div ref={wrapRef} className="relative hidden motion-safe:md:block">
        <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden flex items-center pt-20 pb-12">
          <div ref={trackRef} className="relative flex shrink-0 w-max items-stretch gap-8 px-[6vw] will-change-transform">
            <div className="shrink-0 self-center w-[min(480px,38vw)] pr-4">
              <Heading />
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black bg-white text-p2 font-semibold shadow-[0_4px_0_0_rgba(0,0,0,1)]">
                Scroll to explore
                <ArrowRight size={16} />
              </div>
            </div>

            {entries.map((entry, i) => (
              <Card
                key={`${entry.org}-${entry.start}`}
                entry={entry}
                active={active === i}
                current={isCurrent(entry)}
                className="w-[min(600px,55vw)]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="block motion-safe:md:hidden px-4 py-12">
        <div className="mb-8">
          <Heading />
        </div>
        <ol className="relative ml-2 border-l border-black pl-6 flex flex-col gap-6">
          {entries.map((entry) => (
            <li key={`${entry.org}-${entry.start}`} className="relative">
              <span className="absolute -left-[22px] top-6 w-3 h-3 rounded-full bg-white border border-black" />
              <Card entry={entry} active={false} current={isCurrent(entry)} className="w-full" isMobile />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
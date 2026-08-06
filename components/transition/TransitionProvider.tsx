'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const COVER_DURATION = 500;
const REVEAL_DURATION = 500;
const MIN_COVER_HOLD = 150;

type Phase = 'idle' | 'covering' | 'covered' | 'revealing';

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export const useTransitionNavigate = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransitionNavigate must be used within TransitionProvider');
  return ctx.navigate;
};

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const pendingHrefRef = useRef<string | null>(null);
  const prevPathnameRef = useRef(pathname);

  const navigate = useCallback(
    (href: string) => {
      if (phase !== 'idle') return;
      pendingHrefRef.current = href;
      setPhase('covering');
    },
    [phase],
  );

  useEffect(() => {
    if (phase !== 'covering') return;
    const timer = setTimeout(() => {
      setPhase('covered');
      if (pendingHrefRef.current) router.push(pendingHrefRef.current);
    }, COVER_DURATION);
    return () => clearTimeout(timer);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== 'covered') return;
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;
    pendingHrefRef.current = null;
    const holdTimer = setTimeout(() => setPhase('revealing'), MIN_COVER_HOLD);
    return () => clearTimeout(holdTimer);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== 'revealing') return;
    const timer = setTimeout(() => setPhase('idle'), REVEAL_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  const translateClass =
    phase === 'idle' ? 'translate-y-full' : phase === 'revealing' ? '-translate-y-full' : 'translate-y-0';

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[9998] bg-primary-white border-t-4 border-primary-black flex items-center justify-center transition-transform ease-in-out ${translateClass} ${
          phase === 'idle' ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        style={{
          transitionDuration: `${phase === 'revealing' ? REVEAL_DURATION : COVER_DURATION}ms`,
          backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      >
        <p className="font-jakarta font-extrabold text-primary-black text-2xl tablet:text-4xl tracking-widest uppercase">
          Zanathmar
        </p>
      </div>
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
'use client';

import { useState, useCallback, useRef } from 'react';
import Shuffle from './Shuffle';

const EXIT_DURATION = 700; // must match the CSS transition duration below
const HOLD_AFTER_SHUFFLE = 700;

const Preloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const hasFinishedRef = useRef(false);

  const handleShuffleComplete = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onComplete?.(), EXIT_DURATION);
    }, HOLD_AFTER_SHUFFLE);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-primary-white transition-transform duration-700 ease-in-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.18) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-5 border-4 border-primary-black bg-primary-white px-8 py-10 tablet:px-14 shadow-[-10px_10px_0_0_rgb(0,0,0)]">
        <Shuffle
          text="ZANATHMAR"
          tag="h1"
          className="font-jakarta font-extrabold text-primary-black text-3xl tablet:text-6xl desktop:text-7xl tracking-widest"
          shuffleDirection="right"
          duration={0.4}
          animationMode="evenodd"
          shuffleTimes={2}
          ease="power3.out"
          stagger={0.04}
          scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#*+="
          threshold={0}
          triggerOnce={true}
          triggerOnHover={false}
          respectReducedMotion={true}
          onShuffleComplete={handleShuffleComplete}
        />
        <div className="h-1 w-full bg-primary-black" />
        <p className="border-2 border-primary-black bg-primary-black px-4 py-2 font-jakarta text-p2 font-bold uppercase tracking-[0.4em] text-primary-white shadow-[-4px_4px_0_0_rgb(255,255,255),-4px_4px_0_2px_rgb(0,0,0)]">
          Portfolio
        </p>
      </div>
      <p className="font-jakarta text-p2 font-bold uppercase tracking-[0.3em] text-primary-black">
        Loading…
      </p>
    </div>
  );
};

export default Preloader;
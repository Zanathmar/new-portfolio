'use client';

import { useEffect, useState } from 'react';

interface Quote {
  text: string;
  context: string;
}

// Personal mottos drawn from the work: building for the web, teaching students,
// and learning out loud.
const quotes: Quote[] = [
  {
    text: 'What I build breaks. What I teach multiplies.',
    context: 'on volunteering in classrooms',
  },
  {
    text: 'Clean code is respect for the person who reads it next.',
    context: 'on the craft',
  },
  {
    text: 'Every student I teach teaches me back twice.',
    context: 'on learning out loud',
  },
  {
    text: 'Small builds, done with care, outlast big builds done in haste.',
    context: 'on shipping thoughtfully',
  },
  {
    text: 'I learn in public so my students never learn alone.',
    context: 'on teaching web development',
  },
  {
    text: 'Discipline in the small things makes the big things possible.',
    context: 'on showing up every day',
  },
  {
    text: 'The web is a classroom if you build it that way.',
    context: 'on making things for people',
  },
  {
    text: 'Every bug I fix makes the next lesson easier to teach.',
    context: 'on steady improvement',
  },
  {
    text: 'From a classroom in Jakarta to the open web, one line at a time.',
    context: 'on where the work starts',
  },
  {
    text: 'Software is a craft; teaching is how I sharpen it.',
    context: 'on practice',
  },
];

const pick = () => Math.floor(Math.random() * quotes.length);

const FooterQuote = () => {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(pick());
  }, []);

  if (index === null) {
    return <div className="h-16" aria-hidden="true" />;
  }

  const quote = quotes[index];

  return (
    <blockquote className="flex flex-col gap-1">
      <p className="text-sm font-semibold leading-relaxed text-black">
        &ldquo;{quote.text}&rdquo;
      </p>
      <footer className="text-xs text-gray-600">{quote.context}</footer>
    </blockquote>
  );
};

export default FooterQuote;
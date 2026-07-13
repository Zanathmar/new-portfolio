'use client';

import { useState } from 'react';
import PreloadScreen from '../components/PreloadScreen';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <PreloadScreen onComplete={() => setLoaded(true)} />}
      <div
        className="App"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
        }}
      >
        <Header />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
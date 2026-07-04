// src/App.tsx
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { CvModal } from './components/ui/CvModal';
import { EmailModal } from './components/ui/EmailModal';
import { usePortfolioStore } from './store/usePortfolioStore';
import { useScrollSpy } from './hooks/useScrollSpy';
import type { SectionId } from './types';

const SECTIONS: SectionId[] = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
];

function App() {
  const darkMode = usePortfolioStore((s) => s.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  useScrollSpy(SECTIONS);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <CvModal />
      <EmailModal />
    </>
  );
}

export default App;

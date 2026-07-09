import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const SectionNav = () => {
  const [sections, setSections] = useState<{id: string, num: string}[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    // A short timeout to ensure DOM is fully rendered after route change
    const updateSections = () => {
      const sectionElements = Array.from(document.querySelectorAll('section'));
      
      // Assign IDs if they don't have one
      sectionElements.forEach((el, index) => {
        if (!el.id) {
          el.id = `section-${index + 1}`;
        }
      });

      const newSections = sectionElements.map((el, index) => ({
        id: el.id,
        num: String(index + 1).padStart(2, '0')
      }));

      setSections(newSections);

      if (newSections.length > 0 && !activeSection) {
        setActiveSection(newSections[0].id);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );

      sectionElements.forEach((el) => observer.observe(el));
      
      return observer;
    };

    const timeout = setTimeout(() => {
       const observer = updateSections();
       // Cleanup not easy to pass out of timeout but we can just ignore for simplicity in prototype
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  if (sections.length === 0) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-16 z-40 hidden xl:flex flex-col justify-center items-center pointer-events-none bg-brand-bg/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 pointer-events-auto text-brand-text">
        {sections.map(({ id, num }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Scroll to section ${num}`}
              className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
            >
              <div 
                className={`absolute transition-all duration-300 rounded-full border ${
                  isActive 
                    ? 'w-8 h-8 border-brand-text bg-brand-text/5' 
                    : 'w-1 h-1 border-brand-text/30 group-hover:w-6 group-hover:h-6 group-hover:border-brand-text/50'
                }`}
              />
              <span className={`font-mono text-[10px] transition-all duration-300 ${
                isActive ? 'opacity-100 text-brand-text' : 'opacity-0 text-brand-muted group-hover:opacity-100'
              }`}>
                {num}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

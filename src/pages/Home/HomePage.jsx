import { useEffect, useRef, useState } from 'react';

import { PageScroll } from '@/shared/ui/PageScroll';
import { About } from '@/widgets/About';
import { Benefits } from '@/widgets/Benefits';
import { Feedback } from '@/widgets/Feedback';
import { Footer } from '@/widgets/Footer';
import { Home } from '@/widgets/Home';
import { Projects } from '@/widgets/Projects';
import { Services } from '@/widgets/Services';
import { Workflow } from '@/widgets/Workflow';

export const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const simpleBarReference = useRef(null);

  useEffect(() => {
    const simpleBarInstance = simpleBarReference.current;
    if (!simpleBarInstance) return;

    const scrollElement = simpleBarInstance.getScrollElement();
    if (!scrollElement) return;

    const handleScroll = () => {
      setIsScrolled(scrollElement.scrollTop > 10);
    };

    const handleAnchorClick = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchorElement = event.target.closest('a[href^="#"]');
      if (!anchorElement) {
        return;
      }

      const hrefAttribute = anchorElement.getAttribute('href');
      const targetIdentifier = hrefAttribute?.slice(1);
      if (!targetIdentifier) {
        return;
      }

      const targetElement = document.getElementById(targetIdentifier);
      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    scrollElement.addEventListener('click', handleAnchorClick);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      scrollElement.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="page">
      <PageScroll ref={simpleBarReference} labelledBy="home-page-scroll-title">
        <span className="visually-hidden" id="home-page-scroll-title">
          Содержимое главной страницы
        </span>
        <main className="main">
          <Home isScrolled={isScrolled} />
          <Benefits />
          <About />
          <Services />
          <Projects />
          <Workflow />
          <Feedback />
        </main>
        <Footer />
      </PageScroll>
    </div>
  );
};

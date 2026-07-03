import { useEffect, useRef, useState } from 'react';

import { PageScroll } from '@/shared/ui/PageScroll';
import { Feedback } from '@/widgets/Feedback';
import { Footer } from '@/widgets/Footer';
import { PageInfo } from '@/widgets/PageInfo';
import { Portfolio } from '@/widgets/Portfolio';
import { Stats } from '@/widgets/Stats';

const projectsNavigationItems = [
  { label: 'Главная', href: '/' },
  { label: 'О компании', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Этапы', href: '/stages' },
  { label: 'Контакты', href: '/contacts' },
];

export const ProjectsPage = () => {
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
      <PageScroll ref={simpleBarReference} labelledBy="projects-page-scroll-title">
        <span className="visually-hidden" id="projects-page-scroll-title">
          Содержимое страницы проектов
        </span>
        <main className="main">
          <PageInfo
            activeHref="/projects"
            backgroundImage="/images/projects/projects-background.webp"
            currentLabel="Проекты"
            description="Реализованные дома, в которых комфортно жить"
            identifier="projects"
            isScrolled={isScrolled}
            navigationItems={projectsNavigationItems}
            title="Наши проекты"
          />
          <Portfolio />
          <Stats />
          <Feedback
            backgroundImage="/images/projects/projects-background-1.webp"
            description="Оставьте заявку — мы свяжемся с вами, ответим на вопросы и рассчитаем стоимость вашего проекта."
            hasAgreement
            title="Хотите такой же дом?"
          />
        </main>
        <Footer
          logoHref="/"
          navigationItems={projectsNavigationItems}
          serviceHref="/services"
        />
      </PageScroll>
    </div>
  );
};

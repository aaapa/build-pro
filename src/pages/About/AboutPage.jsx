import { useEffect, useRef, useState } from 'react';

import { PageScroll } from '@/shared/ui/PageScroll';
import { Footer } from '@/widgets/Footer';
import { Feedback } from '@/widgets/Feedback';
import { PageInfo } from '@/widgets/PageInfo';
import { Intro } from '@/widgets/Intro';
import { Process } from '@/widgets/Process';
import { Team } from '@/widgets/Team';
import { Values } from '@/widgets/Values';

const aboutNavigationItems = [
  { label: 'Главная', href: '/' },
  { label: 'О компании', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Этапы', href: '/stages' },
  { label: 'Контакты', href: '/contacts' },
];

export const AboutPage = () => {
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
      <PageScroll ref={simpleBarReference} labelledBy="about-page-scroll-title">
        <span className="visually-hidden" id="about-page-scroll-title">
          Содержимое страницы о компании
        </span>
        <main className="main">
          <PageInfo
            activeHref="/about"
            backgroundImage="/images/about/about-background.webp"
            currentLabel="О компании"
            identifier="about"
            isScrolled={isScrolled}
            navigationItems={aboutNavigationItems}
            title="О компании"
          />
          <Intro />
          <Values />
          <Team />
          <Process
            eyebrow="Как мы работаем"
            title="Прозрачный процесс на всех этапах"
          />
          <Feedback
            backgroundImage="/images/about/about-background-1.webp"
            description="Оставьте заявку — и мы свяжемся с вами для бесплатной консультации"
            hasAgreement={false}
            title="Давайте построим ваш дом мечты"
          />
        </main>
        <Footer
          logoHref="/"
          navigationItems={aboutNavigationItems}
          serviceHref="/services"
        />
      </PageScroll>
    </div>
  );
};

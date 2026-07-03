import { useEffect, useRef, useState } from 'react';

import { PageScroll } from '@/shared/ui/PageScroll';
import { Feedback } from '@/widgets/Feedback';
import { Footer } from '@/widgets/Footer';
import { PageInfo } from '@/widgets/PageInfo';
import { Stages } from '@/widgets/Stages';

const stagesNavigationItems = [
  { label: 'Главная', href: '/' },
  { label: 'О компании', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Этапы', href: '/stages' },
  { label: 'Контакты', href: '/contacts' },
];

export const StagesPage = () => {
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
      <PageScroll ref={simpleBarReference} labelledBy="stages-page-scroll-title">
        <span className="visually-hidden" id="stages-page-scroll-title">
          Содержимое страницы этапов строительства
        </span>
        <main className="main">
          <PageInfo
            activeHref="/stages"
            backgroundImage="/images/stages/stages-background.webp"
            currentLabel="Этапы"
            description="Прозрачный и понятный процесс от идеи до готового дома"
            identifier="stages"
            isScrolled={isScrolled}
            navigationItems={stagesNavigationItems}
            title="Этапы строительства"
          />
          <Stages />
          <Feedback
            backgroundImage="/images/stages/stages-background-1.webp"
            description="Оставьте заявку — мы свяжемся с вами и ответим на все вопросы"
            hasAgreement
            title="Готовы начать строительство вашего дома мечты?"
          />
        </main>
        <Footer
          logoHref="/"
          navigationItems={stagesNavigationItems}
          serviceHref="/services"
        />
      </PageScroll>
    </div>
  );
};

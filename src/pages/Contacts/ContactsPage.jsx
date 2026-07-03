import { useEffect, useRef, useState } from 'react';

import { PageScroll } from '@/shared/ui/PageScroll';
import { Contacts } from '@/widgets/Contacts';
import { Feedback } from '@/widgets/Feedback';
import { Footer } from '@/widgets/Footer';
import { PageInfo } from '@/widgets/PageInfo';

const contactsNavigationItems = [
  { label: 'Главная', href: '/' },
  { label: 'О компании', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Этапы', href: '/stages' },
  { label: 'Контакты', href: '/contacts' },
];

export const ContactsPage = () => {
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
      <PageScroll ref={simpleBarReference} labelledBy="contacts-page-scroll-title">
        <span className="visually-hidden" id="contacts-page-scroll-title">
          Содержимое страницы контактов
        </span>
        <main className="main">
          <PageInfo
            activeHref="/contacts"
            backgroundImage="/images/contacts/contacts-background.webp"
            currentLabel="Контакты"
            description="Мы всегда на связи и готовы ответить на любые ваши вопросы"
            identifier="contacts"
            isScrolled={isScrolled}
            navigationItems={contactsNavigationItems}
            title="Контакты"
          />
          <Contacts />
          <Feedback
            backgroundImage="/images/contacts/contacts-background-1.webp"
            description="Оставьте заявку — мы свяжемся с вами, проконсультируем и рассчитаем стоимость проекта."
            hasAgreement
            title="Готовы начать строительство вашего дома мечты?"
          />
        </main>
        <Footer
          logoHref="/"
          navigationItems={contactsNavigationItems}
          serviceHref="/services"
        />
      </PageScroll>
    </div>
  );
};

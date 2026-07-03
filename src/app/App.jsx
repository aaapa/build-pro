import { useEffect } from 'react';

import { HomePage } from '@/pages/Home';
import { AboutPage } from '@/pages/About';
import { ContactsPage } from '@/pages/Contacts';
import { ProjectsPage } from '@/pages/Projects';
import { ServicesPage } from '@/pages/Services';
import { StagesPage } from '@/pages/Stages';
import { normalizeRoutePath } from '@/shared/lib/routing';

const pageTitleByPath = {
  '/': 'Главная',
  '/about': 'О компании',
  '/services': 'Услуги',
  '/projects': 'Проекты',
  '/stages': 'Этапы',
  '/contacts': 'Контакты',
};

export const App = () => {
  const normalizedPathname = normalizeRoutePath(window.location.pathname);
  const pageTitle = pageTitleByPath[normalizedPathname] ?? pageTitleByPath['/'];

  useEffect(() => {
    document.title = `BuildPro | ${pageTitle}`;
  }, [pageTitle]);

  if (normalizedPathname === '/about') {
    return <AboutPage />;
  }

  if (normalizedPathname === '/services') {
    return <ServicesPage />;
  }

  if (normalizedPathname === '/projects') {
    return <ProjectsPage />;
  }

  if (normalizedPathname === '/stages') {
    return <StagesPage />;
  }

  if (normalizedPathname === '/contacts') {
    return <ContactsPage />;
  }

  return <HomePage />;
};

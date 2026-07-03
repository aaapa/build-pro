import { useEffect, useRef, useState } from 'react';

import { SvgIcon } from '@/shared/ui/SvgIcon';

import { Button } from '@/shared/ui/Button';
import { Logo } from '@/shared/ui/Logo';
import { MenuButton } from '@/shared/ui/MenuButton';
import { getPageHref } from '@/shared/lib/routing';

import './Header.scss';

const defaultNavigationItems = [
  { label: 'Главная', href: '/' },
  { label: 'О компании', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Этапы', href: '/stages' },
  { label: 'Контакты', href: '/contacts' },
];

export const Header = ({
  activeHref,
  feedbackHref = '#feedback',
  isScrolled,
  logoHref = '/',
  navigationItems = defaultNavigationItems,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerMenuReference = useRef(null);
  const menuButtonReference = useRef(null);
  const headerMenuId = 'header-menu';

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleDocumentPointerDown = (event) => {
      const headerMenuElement = headerMenuReference.current;
      const menuButtonElement = menuButtonReference.current;

      if (!(event.target instanceof Node)) {
        return;
      }

      const isInsideHeaderMenu = headerMenuElement?.contains(event.target);
      const isInsideMenuButton = menuButtonElement?.contains(event.target);

      if (!isInsideHeaderMenu && !isInsideMenuButton) {
        setIsMenuOpen(false);
      }
    };

    const handleDocumentKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonReference.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handleDocumentPointerDown);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={`header${isScrolled ? ' header--is-scrolled' : ''}`}>
      <div className="header__inner container">
        <Logo className="header__logo" href={getPageHref(logoHref)} />

        <div
          ref={headerMenuReference}
          className={`header__menu${isMenuOpen ? ' header__menu--is-open' : ''}`}
          id={headerMenuId}
        >
          <nav className="header__nav">
            <ul className="header__list">
              {navigationItems.map((navigationItem) => {
                const isActive = navigationItem.href === activeHref || navigationItem.isActive;

                return (
                  <li className="header__item" key={navigationItem.href}>
                    <a
                      className={`header__link${isActive ? ' header__link--is-active' : ''}`}
                      href={getPageHref(navigationItem.href)}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {navigationItem.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Button
            className="header__menu-button-order"
            additionalClasses="visible-tablet"
            href={feedbackHref}
            variant="dark"
            onClick={() => setIsMenuOpen(false)}
          >
            Заказать звонок
          </Button>
        </div>

        <div className="header__contacts">
          <a className="header__phone" href="tel:+74951234567">
            <SvgIcon name="phone" size={16} />
            <span>+7 (495) 123-45-67</span>
          </a>
          <Button className="header__button" href={feedbackHref} variant="outline-light">
            Заказать звонок
          </Button>
          <MenuButton
            ref={menuButtonReference}
            className="header__menu-button"
            additionalClasses="visible-tablet"
            controls={headerMenuId}
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          />
        </div>
      </div>
    </header>
  );
};

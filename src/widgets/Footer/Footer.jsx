import Tippy from '@tippyjs/react';
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

import { getPageHref } from '@/shared/lib/routing';
import { Logo } from '@/shared/ui/Logo';

import './Footer.scss';

const defaultNavigationItems = [
  { label: 'Главная', href: '#home' },
  { label: 'О компании', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Этапы', href: '#workflow' },
  { label: 'Контакты', href: '#contacts' },
];

const defaultFooterServices = [
  'Строительство домов',
  'Проектирование',
  'Ремонт и отделка',
  'Инженерные системы',
  'Ландшафтные работы',
];

export const Footer = ({
  logoHref = '#home',
  navigationItems = defaultNavigationItems,
  serviceHref = '#services',
}) => {
  return (
    <footer className="footer" id="contacts">
      <div className="footer__inner container">
        <div className="footer__main">
          <div className="footer__brand">
            <Logo className="footer__logo" href={getPageHref(logoHref)} />
            <p className="footer__description">
              Строительство домов и коттеджей под ключ в Москве и Московской области
            </p>
            <div className="footer__socials">
              <span className="visually-hidden">Социальные сети</span>
              <ul className="footer__socials-list">
                <li className="footer__socials-item">
                  <Tippy content="ВКонтакте">
                    <a className="footer__social-link" href="#!">
                      VK
                      <span className="visually-hidden">ВКонтакте</span>
                    </a>
                  </Tippy>
                </li>
                <li className="footer__socials-item">
                  <Tippy content="Telegram">
                    <a className="footer__social-link" href="#!">
                      <Send size={17} aria-hidden="true" />
                      <span className="visually-hidden">Telegram</span>
                    </a>
                  </Tippy>
                </li>
                <li className="footer__socials-item">
                  <Tippy content="Instagram">
                    <a className="footer__social-link" href="#!">
                      <Instagram size={17} aria-hidden="true" />
                      <span className="visually-hidden">Instagram</span>
                    </a>
                  </Tippy>
                </li>
              </ul>
            </div>
          </div>

          <section className="footer__section">
            <h2 className="footer__title">Навигация</h2>
            <nav className="footer__nav">
              <ul className="footer__list">
                {navigationItems.map((navigationItem) => (
                  <li className="footer__list-item" key={navigationItem.href}>
                    <a className="footer__link" href={getPageHref(navigationItem.href)}>
                      {navigationItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section className="footer__section">
            <h2 className="footer__title">Услуги</h2>
            <nav className="footer__nav">
              <ul className="footer__list">
                {defaultFooterServices.map((serviceName) => (
                  <li className="footer__list-item" key={serviceName}>
                    <a className="footer__link" href={getPageHref(serviceHref)}>
                      {serviceName}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <address className="footer__section">
            <h2 className="footer__title">Контакты</h2>
            <nav className="footer__nav">
              <ul className="footer__list">
                <li className="footer__list-item">
                  <a className="footer__contact-link" href="tel:+74951234567">
                    <Phone size={16} aria-hidden="true" />
                    +7 (495) 123-45-67
                  </a>
                </li>
                <li className="footer__list-item">
                  <a className="footer__contact-link" href="mailto:info@buildpro.ru">
                    <Mail size={16} aria-hidden="true" />
                    info@buildpro.ru
                  </a>
                </li>
                <li className="footer__list-item">
                  <a className="footer__contact-link" href="https://yandex.ru/maps/-/CTefNT9K">
                    <MapPin size={16} aria-hidden="true" />
                    г. Москва, ул. Строителей, 15
                  </a>
                </li>
                <li className="footer__list-item">
                  <span className="footer__contact-link">
                    <Clock size={16} aria-hidden="true" />
                    Пн–Вс 9:00–20:00
                  </span>
                </li>
                <li className="footer__list-item">
                  <a className="footer__contact-link" href="#feedback">
                    <MessageCircle size={16} aria-hidden="true" />
                    Консультация по проекту
                  </a>
                </li>
              </ul>
            </nav>
          </address>
        </div>

        <div className="footer__bottom">
          <p>© 2024 BuildPro. Все права защищены.</p>
          <a className="footer__policy" href="#privacy" id="privacy">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
};

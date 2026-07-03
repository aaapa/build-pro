import { ArrowRight, Home, PaintRoller, Ruler } from 'lucide-react';

import { getAssetHref } from '@/shared/lib/routing';

import './Services.scss';

const services = [
  {
    title: 'Строительство домов',
    text: 'Строим частные дома, коттеджи и таунхаусы под ключ',
    image: '/images/services/services-construction.webp',
    alt: 'Современный частный дом вечером',
    Icon: Home,
  },
  {
    title: 'Проектирование',
    text: 'Разрабатываем индивидуальные архитектурные и инженерные проекты',
    image: '/images/services/services-design.webp',
    alt: 'Современный дом с панорамным остеклением',
    Icon: Ruler,
  },
  {
    title: 'Ремонт и отделка',
    text: 'Выполняем внутреннюю и внешнюю отделку любой сложности',
    image: '/images/services/services-renovation.webp',
    alt: 'Светлая гостиная в современном доме',
    Icon: PaintRoller,
  },
];

export const Services = () => {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services__inner container">
        <p className="title title--small">Наши услуги</p>
        <h2 className="services__title title title--medium" id="services-title">
          Мы предлагаем
        </h2>
        <ul className="services__list">
          {services.map(({ title, text, image, alt, Icon }) => (
            <li className="services__item" key={title}>
              <a className="services__card" href="#feedback">
                <img
                  className="services__image"
                  src={getAssetHref(image)}
                  decoding="async"
                  loading="lazy"
                  width="560"
                  height="318"
                  alt={alt}
                />
                <div className="services__card-content">
                  <Icon className="services__icon" size={24} strokeWidth={1.7} aria-hidden="true" />
                  <h3 className="services__card-title">{title}</h3>
                  <p className="services__card-text">{text}</p>
                  <span className="services__link">
                    Подробнее
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

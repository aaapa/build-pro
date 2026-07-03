import {
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  Home,
  PaintRoller,
  Settings,
  TreePine,
  Wrench,
} from 'lucide-react';

import { getAssetHref } from '@/shared/lib/routing';

import './Catalog.scss';

const catalogItems = [
  {
    title: 'Строительство домов под ключ',
    text: 'Строим частные дома и коттеджи под ключ с гарантией качества и соблюдением сроков.',
    image: '/images/services/services-card-1.webp',
    alt: 'Современный дом с вечерней подсветкой',
    Icon: Home,
    features: ['Все этапы строительства', 'Фиксированная стоимость', 'Гарантия до 10 лет'],
  },
  {
    title: 'Проектирование',
    text: 'Разрабатываем индивидуальные проекты домов и коттеджей с учетом ваших пожеланий.',
    image: '/images/services/services-card-2.webp',
    alt: 'Архитектурные чертежи с ручкой',
    Icon: ClipboardCheck,
    features: ['Индивидуальные решения', '3D-визуализация', 'Согласование и документация'],
  },
  {
    title: 'Ремонт и отделка',
    text: 'Выполняем внутреннюю и внешнюю отделку любой сложности.',
    image: '/images/services/services-card-3.webp',
    alt: 'Гостиная современного дома',
    Icon: PaintRoller,
    features: ['Черновая и чистовая отделка', 'Дизайн интерьера', 'Авторский надзор'],
  },
  {
    title: 'Инженерные системы',
    text: 'Проектируем и монтируем инженерные системы для комфортной жизни.',
    image: '/images/services/services-card-4.webp',
    alt: 'Строительные чертежи с каской',
    Icon: Settings,
    features: ['Отопление и вентиляция', 'Водоснабжение и канализация', 'Электроснабжение и слаботочные сети'],
  },
  {
    title: 'Благоустройство территории',
    text: 'Комплексное благоустройство и озеленение участков любой сложности.',
    image: '/images/services/services-card-5.webp',
    alt: 'Ландшафтный участок с дорожками и подсветкой',
    Icon: TreePine,
    features: ['Ландшафтный дизайн', 'Дорожки и площадки', 'Освещение и полив'],
  },
  {
    title: 'Реконструкция и модернизация',
    text: 'Обновим и модернизируем ваш дом, сделаем его надежным и современным.',
    image: '/images/services/services-card-6.webp',
    alt: 'Современный двухэтажный дом',
    Icon: Wrench,
    features: ['Реконструкция зданий', 'Утепление и фасады', 'Пристройки и надстройки'],
  },
];

export const Catalog = () => {
  return (
    <section className="catalog" id="catalog" aria-labelledby="catalog-title">
      <div className="catalog__inner container">
        <div className="catalog__heading">
          <h2 className="catalog__title title title--medium" id="catalog-title">
            Что мы предлагаем
          </h2>
          <p className="catalog__lead">Комплексные решения для вашего комфорта</p>
        </div>

        <ul className="catalog__list">
          {catalogItems.map(({ title, text, image, alt, Icon, features }) => (
            <li className="catalog__item" key={title}>
              <article className="catalog__card">
                <div className="catalog__image-wrapper">
                  <img
                    className="catalog__image"
                    src={getAssetHref(image)}
                    width="542"
                    height="218"
                    decoding="async"
                    loading="lazy"
                    alt={alt}
                  />
                  <span className="catalog__icon-wrapper">
                    <Icon className="catalog__icon" size={34} strokeWidth={1.55} aria-hidden="true" />
                  </span>
                </div>
                <div className="catalog__content">
                  <h3 className="catalog__card-title">{title}</h3>
                  <p className="catalog__text">{text}</p>
                  <ul className="catalog__features">
                    {features.map((feature) => (
                      <li className="catalog__feature" key={feature}>
                        <CheckCircle className="catalog__feature-icon" size={16} strokeWidth={1.8} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a className="catalog__link" href="#feedback">
                    Подробнее
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

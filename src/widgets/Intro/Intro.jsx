import { SvgIcon } from '@/shared/ui/SvgIcon';

import { getAssetHref, getPageHref } from '@/shared/lib/routing';
import { Button } from '@/shared/ui/Button';

import './Intro.scss';

const aboutStats = [
  { value: '12+', text: 'лет на рынке', Icon: 'shield-check' },
  { value: '250+', text: 'построенных домов', Icon: 'home' },
  { value: '98%', text: 'довольных клиентов', Icon: 'users-round' },
  { value: '10 лет', text: 'гарантия на работы', Icon: 'award' },
];

export const Intro = () => {
  return (
    <section className="intro" id="intro" aria-labelledby="intro-title">
      <div className="intro__inner container">
        <div className="intro__content">
          <p className="title title--small">BuildPro — строим будущее с уверенностью</p>
          <h2 className="intro__title title title--medium" id="intro-title">
            Надежный партнер в строительстве домов под ключ
          </h2>
          <div className="intro__text">
            <p>
              Мы — команда профессионалов с многолетним опытом в проектировании и строительстве
              частных домов, коттеджей и коммерческих объектов. Наша цель — создавать качественные,
              комфортные и энергоэффективные дома, в которых хочется жить.
            </p>
            <p>
              Мы берем на себя все этапы строительства: от идеи и проектирования до сдачи готового дома.
              Соблюдаем сроки, работаем по договору и предоставляем гарантию на все виды работ.
            </p>
          </div>
          <Button className="intro__button" href={getPageHref('/services')} variant="dark">
            Подробнее о наших услугах
            <SvgIcon name="arrow-right" size={16} />
          </Button>
        </div>

        <div className="intro__image-wrapper">
          <img
            className="intro__image"
            src={getAssetHref('/images/about/about-image.webp')}
            decoding="async"
            loading="lazy"
            width="620"
            height="526"
            alt="Современный дом с открытой террасой"
          />
        </div>

        <ul className="intro__stats">
          {aboutStats.map(({ value, text, Icon }) => (
            <li className="intro__stat" key={text}>
              <SvgIcon name={Icon} className="intro__stat-icon" size={34} strokeWidth={1.55} />
              <div className="intro__stat-content">
                <strong className="intro__stat-value">{value}</strong>
                <span className="intro__stat-text">{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

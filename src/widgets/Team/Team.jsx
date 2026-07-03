import { getAssetHref } from '@/shared/lib/routing';

import './Team.scss';

const teamMembers = [
  {
    name: 'Александр Иванов',
    position: 'Генеральный директор',
    image: '/images/about/about-team-1.webp',
    alt: 'Александр Иванов',
  },
  {
    name: 'Михаил Петров',
    position: 'Главный инженер',
    image: '/images/about/about-team-2.webp',
    alt: 'Михаил Петров',
  },
  {
    name: 'Дмитрий Смирнов',
    position: 'Руководитель проектов',
    image: '/images/about/about-team-3.webp',
    alt: 'Дмитрий Смирнов',
  },
  {
    name: 'Екатерина Кузнецова',
    position: 'Менеджер по работе с клиентами',
    image: '/images/about/about-team-4.webp',
    alt: 'Екатерина Кузнецова',
  },
];

export const Team = () => {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team__inner container">
        <div className="team__heading">
          <p className="title title--small">Наша команда</p>
          <h2 className="team__title title title--medium" id="team-title">
            Профессионалы своего дела
          </h2>
        </div>

        <ul className="team__list">
          {teamMembers.map(({ name, position, image, alt }) => (
            <li className="team__item" key={name}>
              <article className="team__card">
                <img
                  className="team__image"
                  src={getAssetHref(image)}
                  decoding="async"
                  loading="lazy"
                  width="428"
                  height="266"
                  alt={alt}
                />
                <div className="team__content">
                  <h3 className="team__name">{name}</h3>
                  <p className="team__position">{position}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

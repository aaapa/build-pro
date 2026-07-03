import { Button } from '@/shared/ui/Button';
import { getAssetHref } from '@/shared/lib/routing';

import './Projects.scss';

const projects = [
  {
    title: 'Дом в стиле modern',
    meta: '240 м² · Москва',
    image: '/images/projects/projects-modern.webp',
    alt: 'Дом в стиле modern с вечерней подсветкой',
    href: '#!',
    modifier: 'large',
  },
  {
    title: 'Загородный коттедж',
    meta: '180 м² · Московская область',
    image: '/images/projects/projects-cottage.webp',
    alt: 'Загородный коттедж с террасой',
    href: '#!',
    modifier: 'wide',
  },
  {
    title: 'Дом с плоской крышей',
    meta: '220 м² · Истра',
    image: '/images/projects/projects-flat-roof.webp',
    alt: 'Дом с плоской крышей и деревянной отделкой',
    href: '#!',
    modifier: 'small',
  },
  {
    title: 'Классический дом',
    meta: '260 м² · Подмосковье',
    image: '/images/projects/projects-classic.webp',
    alt: 'Классический двухэтажный дом',
    href: '#!',
    modifier: 'small',
  },
];

export const Projects = () => {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="projects__inner container">
        <div className="projects__header">
          <div className="projects__heading">
            <p className="title title--small">Проекты</p>
            <h2 className="projects__title title title--medium" id="projects-title">
              Реализованные объекты
            </h2>
          </div>
          <Button className="projects__button" href="#projects" variant="outline-dark">
            Смотреть все проекты
          </Button>
        </div>

        <ul className="projects__grid">
          {projects.map((project) => (
            <li
              className={`projects__item projects__item--${project.modifier}`}
              key={project.title}
            >
              <a
                className={`projects__card projects__card--${project.modifier}`}
                href={project.href}
              >
                <img
                  className="projects__image"
                  src={getAssetHref(project.image)}
                  decoding="async"
                  loading="lazy"
                  width="760"
                  height="474"
                  alt={project.alt}
                />
                <span className="projects__overlay">
                  <span className="projects__card-title">{project.title}</span>
                  <span className="projects__meta">{project.meta}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

import { useMemo, useRef, useState } from 'react';
import { ArrowRight, Bath, BedDouble, Calculator, ChevronRight, Layers, MapPin } from 'lucide-react';

import { Button } from '@/shared/ui/Button';
import { getAssetHref } from '@/shared/lib/routing';

import './Portfolio.scss';

const projectsPerPage = 6;

const filterDefinitions = [
  { identifier: 'all', label: 'Все проекты' },
  { identifier: 'small-area', label: 'Дома до 150 м²' },
  { identifier: 'medium-area', label: 'Дома 150-250 м²' },
  { identifier: 'large-area', label: 'Дома от 250 м²' },
  { identifier: 'cottage', label: 'Коттеджи' },
  { identifier: 'modern', label: 'Современные' },
  { identifier: 'classic', label: 'Классические' },
];

const portfolioItems = [
  {
    identifier: 'modern-istra',
    title: 'Дом в стиле Modern',
    location: 'Московская область, КП «Истра»',
    text: 'Современный двухэтажный дом с панорамными окнами и просторной террасой.',
    area: 240,
    bedrooms: '4 спальни',
    bathrooms: '3 санузла',
    floors: '2 этажа',
    categories: ['modern'],
    image: '/images/projects/projects-card-1.webp',
    alt: 'Дом в стиле Modern с панорамным остеклением',
  },
  {
    identifier: 'forest-cottage',
    title: 'Загородный коттедж',
    location: 'Московская область, КП «Лесной»',
    text: 'Уютный коттедж с мансардой и вторым светом в гостиной.',
    area: 180,
    bedrooms: '3 спальни',
    bathrooms: '2 санузла',
    floors: '2 этажа',
    categories: ['cottage', 'classic'],
    image: '/images/projects/projects-card-2.webp',
    alt: 'Загородный коттедж с мансардой',
  },
  {
    identifier: 'classic-residence',
    title: 'Классический особняк',
    location: 'Московская область, КП «Резиденция»',
    text: 'Роскошный особняк в классическом стиле с бассейном и гаражом.',
    area: 320,
    bedrooms: '5 спален',
    bathrooms: '4 санузла',
    floors: '2 этажа',
    categories: ['classic'],
    image: '/images/projects/projects-card-3.webp',
    alt: 'Классический особняк с просторным участком',
  },
  {
    identifier: 'single-sunny',
    title: 'Одноэтажный дом',
    location: 'Тульская область, КП «Солнечный»',
    text: 'Компактный и функциональный дом для комфортной жизни.',
    area: 145,
    bedrooms: '3 спальни',
    bathrooms: '2 санузла',
    floors: '1 этаж',
    categories: ['modern'],
    image: '/images/projects/projects-card-4.webp',
    alt: 'Одноэтажный дом с террасой',
  },
  {
    identifier: 'flat-panorama',
    title: 'Дом с плоской крышей',
    location: 'Московская область, КП «Панорама»',
    text: 'Стильный дом с плоской крышей, гаражом и большой террасой.',
    area: 260,
    bedrooms: '4 спальни',
    bathrooms: '3 санузла',
    floors: '2 этажа',
    categories: ['modern'],
    image: '/images/projects/projects-card-5.webp',
    alt: 'Дом с плоской крышей и вечерней подсветкой',
  },
  {
    identifier: 'scandinavian-hygge',
    title: 'Скандинавский дом',
    location: 'Калужская область, КП «Хюгге»',
    text: 'Светлый и теплый дом в скандинавском стиле с панорамными окнами.',
    area: 210,
    bedrooms: '3 спальни',
    bathrooms: '2 санузла',
    floors: '2 этажа',
    categories: ['cottage', 'modern'],
    image: '/images/projects/projects-card-6.webp',
    alt: 'Скандинавский дом с высоким остеклением',
  },
  {
    identifier: 'compact-river',
    title: 'Дом у реки',
    location: 'Тверская область, КП «Берег»',
    text: 'Небольшой дом для семейного отдыха с открытой террасой у воды.',
    area: 132,
    bedrooms: '2 спальни',
    bathrooms: '2 санузла',
    floors: '1 этаж',
    categories: ['cottage', 'modern'],
    image: '/images/projects/projects-card-4.webp',
    alt: 'Компактный одноэтажный дом у участка',
  },
  {
    identifier: 'classic-garden',
    title: 'Дом с зимним садом',
    location: 'Московская область, КП «Усадьба»',
    text: 'Классический дом с просторной гостиной и теплым зимним садом.',
    area: 248,
    bedrooms: '4 спальни',
    bathrooms: '3 санузла',
    floors: '2 этажа',
    categories: ['classic'],
    image: '/images/projects/projects-card-3.webp',
    alt: 'Классический дом с фасадной подсветкой',
  },
  {
    identifier: 'modern-line',
    title: 'Дом Line',
    location: 'Московская область, КП «Новые холмы»',
    text: 'Лаконичный современный дом с плоской крышей и навесом для авто.',
    area: 275,
    bedrooms: '4 спальни',
    bathrooms: '3 санузла',
    floors: '2 этажа',
    categories: ['modern'],
    image: '/images/projects/projects-card-5.webp',
    alt: 'Современный дом с плоской крышей',
  },
  {
    identifier: 'cottage-maple',
    title: 'Коттедж «Клен»',
    location: 'Калужская область, КП «Лесные дачи»',
    text: 'Теплый коттедж с мансардой, каминной зоной и вторым светом.',
    area: 168,
    bedrooms: '3 спальни',
    bathrooms: '2 санузла',
    floors: '2 этажа',
    categories: ['cottage', 'classic'],
    image: '/images/projects/projects-card-2.webp',
    alt: 'Коттедж с мансардой и теплой подсветкой',
  },
  {
    identifier: 'mini-modern',
    title: 'Минималистичный дом',
    location: 'Рязанская область, КП «Поле»',
    text: 'Небольшой современный дом с продуманной планировкой и террасой.',
    area: 118,
    bedrooms: '2 спальни',
    bathrooms: '1 санузел',
    floors: '1 этаж',
    categories: ['modern'],
    image: '/images/projects/projects-card-4.webp',
    alt: 'Минималистичный одноэтажный дом',
  },
  {
    identifier: 'classic-estate',
    title: 'Семейная резиденция',
    location: 'Московская область, КП «Сосны»',
    text: 'Большой дом в классическом стиле для постоянного проживания семьи.',
    area: 340,
    bedrooms: '5 спален',
    bathrooms: '4 санузла',
    floors: '2 этажа',
    categories: ['classic'],
    image: '/images/projects/projects-card-3.webp',
    alt: 'Семейная резиденция в классическом стиле',
  },
  {
    identifier: 'glass-house',
    title: 'Дом с панорамным фасадом',
    location: 'Московская область, КП «Высота»',
    text: 'Современный проект с большим остеклением и вечерней подсветкой.',
    area: 230,
    bedrooms: '4 спальни',
    bathrooms: '3 санузла',
    floors: '2 этажа',
    categories: ['modern'],
    image: '/images/projects/projects-card-1.webp',
    alt: 'Современный дом с панорамным фасадом',
  },
  {
    identifier: 'cottage-pine',
    title: 'Коттедж «Сосна»',
    location: 'Тверская область, КП «Заповедник»',
    text: 'Уютный коттедж для загородной жизни с просторной кухней-гостиной.',
    area: 196,
    bedrooms: '3 спальни',
    bathrooms: '2 санузла',
    floors: '2 этажа',
    categories: ['cottage', 'classic'],
    image: '/images/projects/projects-card-2.webp',
    alt: 'Загородный коттедж с мансардой',
  },
  {
    identifier: 'large-modern',
    title: 'Дом Grand Modern',
    location: 'Московская область, КП «Рублево»',
    text: 'Просторный современный дом с гаражом, кабинетом и гостевой зоной.',
    area: 305,
    bedrooms: '5 спален',
    bathrooms: '4 санузла',
    floors: '2 этажа',
    categories: ['modern'],
    image: '/images/projects/projects-card-5.webp',
    alt: 'Большой современный дом с плоской крышей',
  },
];

const filterProjects = (project, filterIdentifier) => {
  if (filterIdentifier === 'small-area') {
    return project.area <= 150;
  }

  if (filterIdentifier === 'medium-area') {
    return project.area > 150 && project.area <= 250;
  }

  if (filterIdentifier === 'large-area') {
    return project.area > 250;
  }

  if (filterIdentifier === 'cottage' || filterIdentifier === 'modern' || filterIdentifier === 'classic') {
    return project.categories.includes(filterIdentifier);
  }

  return true;
};

export const Portfolio = () => {
  const portfolioSectionReference = useRef(null);
  const [activeFilterIdentifier, setActiveFilterIdentifier] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    return portfolioItems.filter((project) => filterProjects(project, activeFilterIdentifier));
  }, [activeFilterIdentifier]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const pageStartIndex = (currentPage - 1) * projectsPerPage;
  const visibleProjects = filteredProjects.slice(pageStartIndex, pageStartIndex + projectsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, pageIndex) => pageIndex + 1);

  const handleFilterClick = (filterIdentifier) => {
    setActiveFilterIdentifier(filterIdentifier);
    setCurrentPage(1);
  };

  const getAvailablePageNumber = (pageNumber) => {
    return Math.min(Math.max(pageNumber, 1), totalPages);
  };

  const scrollPortfolioSectionIntoView = () => {
    window.requestAnimationFrame(() => {
      const portfolioSectionElement = portfolioSectionReference.current;
      if (!portfolioSectionElement) return;

      const scrollContainer = portfolioSectionElement.closest('.simplebar-content-wrapper');
      if (scrollContainer) {
        const scrollContainerRectangle = scrollContainer.getBoundingClientRect();
        const portfolioSectionRectangle = portfolioSectionElement.getBoundingClientRect();

        scrollContainer.scrollTo({
          top: scrollContainer.scrollTop + portfolioSectionRectangle.top - scrollContainerRectangle.top,
          behavior: 'smooth',
        });

        return;
      }

      portfolioSectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(getAvailablePageNumber(pageNumber));
    scrollPortfolioSectionIntoView();
  };

  const handleNextPageClick = () => {
    setCurrentPage((previousPageNumber) => {
      return getAvailablePageNumber(previousPageNumber + 1);
    });
    scrollPortfolioSectionIntoView();
  };

  return (
    <section className="portfolio" id="portfolio" ref={portfolioSectionReference} aria-labelledby="portfolio-title">
      <div className="portfolio__inner container">
        <h2 className="visually-hidden" id="portfolio-title">
          Список проектов
        </h2>
        <div className="portfolio__toolbar">
          <ul className="portfolio__filters">
            {filterDefinitions.map((filterDefinition) => {
              const isActiveFilter = filterDefinition.identifier === activeFilterIdentifier;

              return (
                <li className="portfolio__filter-item" key={filterDefinition.identifier}>
                  <button
                    className={`portfolio__filter${isActiveFilter ? ' portfolio__filter--is-active' : ''}`}
                    type="button"
                    aria-pressed={isActiveFilter}
                    onClick={() => handleFilterClick(filterDefinition.identifier)}
                  >
                    {filterDefinition.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <Button className="portfolio__calculate" href="#feedback" variant="outline-dark">
            <Calculator size={18} aria-hidden="true" />
            Рассчитать стоимость
          </Button>
        </div>

        <ul className="portfolio__list">
          {visibleProjects.map((project) => (
            <li className="portfolio__item" key={project.identifier}>
              <a className="portfolio__card" href="#!">
                <span className="portfolio__image-wrapper">
                  <span className="portfolio__area">{project.area} м²</span>
                  <img
                    className="portfolio__image"
                    src={getAssetHref(project.image)}
                    width="562"
                    height="292"
                    decoding="async"
                    loading="lazy"
                    alt={project.alt}
                  />
                </span>
                <span className="portfolio__content">
                  <span className="portfolio__card-title">{project.title}</span>
                  <span className="portfolio__location">
                    <MapPin className="portfolio__location-icon" size={14} strokeWidth={1.8} aria-hidden="true" />
                    {project.location}
                  </span>
                  <span className="portfolio__text">{project.text}</span>
                  <span className="portfolio__features">
                    <span className="portfolio__feature">
                      <BedDouble size={16} strokeWidth={1.65} aria-hidden="true" />
                      {project.bedrooms}
                    </span>
                    <span className="portfolio__feature">
                      <Bath size={16} strokeWidth={1.65} aria-hidden="true" />
                      {project.bathrooms}
                    </span>
                    <span className="portfolio__feature">
                      <Layers size={16} strokeWidth={1.65} aria-hidden="true" />
                      {project.floors}
                    </span>
                  </span>
                  <span className="portfolio__link">
                    Смотреть проект
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <nav className="portfolio__pagination" aria-labelledby="pagination-title">
            <h2 className="visually-hidden" id="pagination-title">
              Пагинация проектов
            </h2>
            <ol className="portfolio__pagination-list">
              {pageNumbers.map((pageNumber) => {
                const isCurrentPage = pageNumber === currentPage;

                return (
                  <li key={pageNumber}>
                    <button
                      className={`portfolio__pagination-link${isCurrentPage ? ' portfolio__pagination-link--is-active' : ''}`}
                      type="button"
                      aria-current={isCurrentPage ? 'page' : undefined}
                      onClick={() => handlePageClick(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  className="portfolio__pagination-link portfolio__pagination-link--next"
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={handleNextPageClick}
                >
                  <ChevronRight size={16} aria-hidden="true" />
                  <span className="visually-hidden">Следующая страница</span>
                </button>
              </li>
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
};

import { SvgIcon } from '@/shared/ui/SvgIcon';

import { getAssetHref } from '@/shared/lib/routing';
import { Button } from '@/shared/ui/Button';
import { Header } from '@/widgets/Header';

import './Home.scss';

export const Home = ({ isScrolled }) => {
  return (
    <section
      className="home"
      id="home"
      style={{
        '--home-background-image': `url("${getAssetHref('/images/home/home-background.webp')}")`,
        '--home-mobile-background-image': `url("${getAssetHref('/images/home/home-background-mobile.webp')}")`,
      }}
      aria-labelledby="home-title"
    >
      <Header isScrolled={isScrolled} />
      <div className="home__inner container">
        <div className="home__content">
          <h1 className="home__title" id="home-title">
            Строим дома, в которых хочется жить
          </h1>
          <p className="home__description">
            Проектируем и строим надежные, современные и энергоэффективные дома под ключ
            с гарантией качества и в срок.
          </p>
          <div className="home__actions">
            <Button className="home__button" href="#projects" variant="main">
              Наши проекты
            </Button>
            <Button className="home__button" href="#feedback" variant="outline-light">
              Рассчитать стоимость
              <SvgIcon name="arrow-right" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

import { getAssetHref, getPageHref } from '@/shared/lib/routing';
import { Header } from '@/widgets/Header';

import './PageInfo.scss';

export const PageInfo = ({
  activeHref,
  backgroundImage,
  currentLabel,
  description,
  identifier,
  isScrolled,
  navigationItems,
  title,
}) => {
  const titleIdentifier = `${identifier}-info-title`;
  const breadcrumbsTitleIdentifier = `${identifier}-breadcrumbs-title`;

  return (
    <section
      className="page-info"
      id={identifier}
      style={{ '--page-info-background-image': `url("${getAssetHref(backgroundImage)}")` }}
      aria-labelledby={titleIdentifier}
    >
      <Header
        activeHref={activeHref}
        feedbackHref="#feedback"
        isScrolled={isScrolled}
        logoHref="/"
        navigationItems={navigationItems}
      />
      <div className="page-info__inner container">
        <h1 className="page-info__title" id={titleIdentifier}>
          {title}
        </h1>
        {description && <p className="page-info__description">{description}</p>}
        <nav className="page-info__breadcrumbs" aria-labelledby={breadcrumbsTitleIdentifier}>
          <h2 className="visually-hidden" id={breadcrumbsTitleIdentifier}>
            Навигационная цепочка
          </h2>
          <ol className="page-info__breadcrumbs-list">
            <li className="page-info__breadcrumbs-item">
              <a className="page-info__breadcrumbs-link" href={getPageHref('/')}>
                Главная
              </a>
            </li>
            <li className="page-info__breadcrumbs-item">
              <span className="page-info__breadcrumbs-current">{currentLabel}</span>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

import clsx from 'clsx';
import Tippy from '@tippyjs/react';

import './Logo.scss';

export const Logo = ({ className, href = '#home', variant = 'light' }) => {
  const classNames = clsx(className, 'logo', `logo--${variant}`);

  return (
    <Tippy content="На главную">
      <a className={classNames} href={href}>
        <svg
          className="logo__mark"
          width="36"
          height="30"
          viewBox="0 0 36 30"
          aria-hidden="true"
        >
          <path d="M4 26L18 4L32 26H22.8" />
          <path d="M13 22H23" />
        </svg>
        <span className="logo__text" aria-hidden="true">
          <span className="logo__name">BuildPro</span>
          <span className="logo__caption">Строим будущее</span>
        </span>
        <span className="visually-hidden">На главную</span>
      </a>
    </Tippy>
  );
};

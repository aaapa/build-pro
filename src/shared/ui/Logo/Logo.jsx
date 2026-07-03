import clsx from 'clsx';
import Tippy from '@tippyjs/react';

import { SvgIcon } from '@/shared/ui/SvgIcon';

import './Logo.scss';

export const Logo = ({ className, href = '#home', variant = 'light' }) => {
  const classNames = clsx(className, 'logo', `logo--${variant}`);

  return (
    <Tippy content="На главную">
      <a className={classNames} href={href}>
        <SvgIcon className="logo__mark" name="logo-mark" width={36} height={30} />
        <span className="logo__text" aria-hidden="true">
          <span className="logo__name">BuildPro</span>
          <span className="logo__caption">Строим будущее</span>
        </span>
        <span className="visually-hidden">На главную</span>
      </a>
    </Tippy>
  );
};

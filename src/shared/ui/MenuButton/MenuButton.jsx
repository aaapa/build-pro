import { forwardRef } from 'react';
import clsx from 'clsx';

import './MenuButton.scss';

export const MenuButton = forwardRef(({
  additionalClasses,
  className,
  controls,
  isOpen,
  onClick,
}, menuButtonReference) => {
  return (
    <button
      ref={menuButtonReference}
      className={clsx(className, 'menu-button', additionalClasses)}
      type="button"
      aria-controls={controls}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      onClick={onClick}
    >
      <span
        className={clsx('menu-button__icon', isOpen && 'menu-button__icon--is-open')}
        aria-hidden="true"
      >
        <span className="menu-button__line" />
        <span className="menu-button__line" />
        <span className="menu-button__line" />
      </span>
      <span className="visually-hidden">{isOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
    </button>
  );
});

MenuButton.displayName = 'MenuButton';

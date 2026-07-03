import { Children, cloneElement, isValidElement } from 'react';
import clsx from 'clsx';

import './Checkbox.scss';

const addLinkClass = (children) => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && child.type === 'a') {
      return cloneElement(child, {
        className: clsx(child.props.className, 'checkbox__link'),
      });
    }
    if (child?.props?.children) {
      return cloneElement(child, {
        children: addLinkClass(child.props.children),
      });
    }
    return child;
  });
};

export const Checkbox = ({ className, children, ...props }) => {
  return (
    <label className={clsx(className, 'checkbox')}>
      <input className="checkbox__input" type="checkbox" {...props} />
      {children && <span className="checkbox__text">{addLinkClass(children)}</span>}
    </label>
  );
};

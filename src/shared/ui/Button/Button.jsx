import clsx from 'clsx';

import './Button.scss';

export const Button = ({
  additionalClasses,
  children,
  className,
  href,
  variant = 'main',
  ...props
}) => {
  const classNames = clsx(className, 'button', `button--${variant}`, additionalClasses);

  if (href) {
    return (
      <a className={classNames} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classNames} type={props.type || 'button'} {...props}>
      {children}
    </button>
  );
};

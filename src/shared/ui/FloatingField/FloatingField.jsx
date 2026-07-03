import { forwardRef } from 'react';
import clsx from 'clsx';

import './FloatingField.scss';

export const FloatingField = forwardRef(({
  className,
  controlClassName,
  description,
  id,
  isTextarea = false,
  label,
  required = false,
  variant = 'light',
  ...props
}, fieldReference) => {
  const descriptionIdentifier = `${id}-description`;
  const FieldControl = isTextarea ? 'textarea' : 'input';
  const fieldDescription = description || (required ? 'Обязательное поле' : 'Необязательное поле');

  return (
    <div className={clsx(className, 'floating-field', `floating-field--${variant}`, isTextarea && 'floating-field--textarea')}>
      <FieldControl
        ref={fieldReference}
        className={clsx(controlClassName, 'floating-field__control')}
        id={id}
        placeholder=" "
        aria-required={required ? 'true' : undefined}
        aria-describedby={descriptionIdentifier}
        required={required}
        {...props}
      />
      <label className="floating-field__label" htmlFor={id}>
        {label}
      </label>
      <span className="visually-hidden" id={descriptionIdentifier}>
        {fieldDescription}
      </span>
    </div>
  );
});

FloatingField.displayName = 'FloatingField';

import clsx from 'clsx';

import { getAssetHref } from '@/shared/lib/routing';

import './SvgIcon.scss';

export const SvgIcon = ({
  className,
  fill = 'none',
  height,
  name,
  size = 24,
  strokeWidth = 2,
  width,
}) => {
  return (
    <svg
      className={clsx('svg-icon', className)}
      width={width ?? size}
      height={height ?? size}
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <use href={getAssetHref(`/icons/sprite.svg#${name}`)} />
    </svg>
  );
};

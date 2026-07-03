const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const getPageHref = (path = '/') => {
  if (!path.startsWith('/')) {
    return path;
  }

  return path === '/' ? `${basePath}/` : `${basePath}${path}`;
};

export const getAssetHref = (path) => {
  if (!path.startsWith('/')) {
    return path;
  }

  return `${basePath}${path}`;
};

export const normalizeRoutePath = (pathname) => {
  const pathWithoutBase = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;

  return pathWithoutBase.replace(/\/$/, '') || '/';
};

export default function isActivePath(currentPath, to, end) {
  if (to === '/') {
    return currentPath === '/';
  }

  if (end) {
    return currentPath === to;
  }

  return currentPath === to || currentPath.startsWith(to + '/');
}

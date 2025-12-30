import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

/**
 * Format date thành relative time (vd: "2h", "3n", "5t")
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';

  try {
    const date = parseISO(dateString);
    return formatDistanceToNowStrict(date, { addSuffix: false, locale: vi });
  } catch {
    return '';
  }
};

/**
 * Format number thành compact string (vd: 1.2K, 1.5M)
 */
export const formatNumber = (num) => {
  if (!num || num === 0) return '';

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

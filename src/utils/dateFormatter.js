import dayjs from 'dayjs';
import 'dayjs/locale/es';

// Set Spanish locale
dayjs.locale('es');

/**
 * Format date using Spanish locale
 * @param {string|Date} date - Date to format
 * @param {string} format - dayjs format string (default: 'DD/MM/YYYY')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '';
  return dayjs(date).format(format);
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date with time (e.g., "25/03/2026 14:30")
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

/**
 * Get relative time (e.g., "hace 2 horas")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

export default dayjs;

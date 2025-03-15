import { differenceInMonths } from 'date-fns';

/**
 * Calculates the number of months between two dates.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 *
 * @returns {string} A formatted string representing relative time between the two dates in years and months.
 */
const calculateMonths = (startDate: Date, endDate: Date): string => {
  const diffInMonths = differenceInMonths(endDate, startDate) + 1;
  const diffInYears = Math.floor(diffInMonths / 12);
  const remainingMonths = diffInMonths % 12;

  return `${diffInYears > 0 ? `${diffInYears} year${diffInYears > 1 ? 's' : ''}` : ''}
  ${diffInYears > 0 && remainingMonths > 0 ? ' ' : ''}
  ${remainingMonths > 0 ? `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
};

export default calculateMonths;

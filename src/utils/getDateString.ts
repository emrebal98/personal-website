import dayjs from 'dayjs';
import type { IExperience } from '../types';
import calculateMonths from './calculateMonths';

/**
 * Generates a formatted string representing the time period between two dates.
 *
 * @param {Date} startDate - The start date of the time period.
 * @param {Date} endDate - The end date of the time period.
 *
 * @returns {string} A formatted string representing the time period between the two dates.
 */
const getDateString = (job: IExperience['jobs'][number]) => {
  const { startDate, endDate, isPresent } = job;
  // Convert the dates to dayjs objects for easier manipulation
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  // Calculate the number of months between the two dates
  const monthDiff = calculateMonths(startDate, endDate);
  // Generate and return the formatted string
  const result = `${start.format('MMM YYYY')} - ${
    isPresent ? 'Present' : end.format('MMM YYYY')
  } • ${monthDiff + 1} month${monthDiff + 1 > 1 ? 's' : ''}`;
  return result;
};

export default getDateString;

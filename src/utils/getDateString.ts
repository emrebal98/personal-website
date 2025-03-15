import { format } from 'date-fns';
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

  return `${format(startDate, 'MMM yyyy')} - 
  ${isPresent ? 'Present' : format(endDate, 'MMM yyyy')} • 
  ${calculateMonths(startDate, endDate)}`;
};

export default getDateString;

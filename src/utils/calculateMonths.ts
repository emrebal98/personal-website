import dayjs from 'dayjs';

/**
 * Calculates the number of months between two dates.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 *
 * @returns {number} The number of months between the two dates.
 */
const calculateMonths = (startDate: Date, endDate: Date) => {
  // Convert the dates to dayjs objects for easier manipulation
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  // Subtract the start date's month from the end date's month and return the result
  return end.subtract(start.get('months'), 'months').get('months');
};

export default calculateMonths;

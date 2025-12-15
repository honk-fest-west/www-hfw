/**
 * Festival Date Utility Module
 *
 * Centralized date management system that automatically extracts festival dates
 * from days.toml and provides formatting utilities for consistent date display
 * throughout the application.
 *
 * @module util/dates
 */

// @ts-ignore - TOML import handled by vite-plugin-toml
import rawDays from '@data/festival/days.toml';

/**
 * Festival dates type definition
 */
export interface FestivalDates {
  /** First day of the festival */
  startDate: Date;
  /** Last day of the festival */
  endDate: Date;
  /** All festival dates in chronological order */
  dates: Date[];
  /** Festival year */
  year: number;
}

/**
 * Validates that days.toml contains valid date keys
 * @throws {Error} If no dates found or invalid date format
 */
function validateDates(): void {
  const dateKeys = Object.keys(rawDays);

  if (dateKeys.length === 0) {
    throw new Error('days.toml contains no date entries');
  }

  const invalidKeys = dateKeys.filter(key => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return !datePattern.test(key);
  });

  if (invalidKeys.length > 0) {
    throw new Error(
      `Invalid date keys in days.toml: ${invalidKeys.join(', ')}. ` +
      'Expected format: YYYY-MM-DD'
    );
  }
}

/**
 * Extracts and sorts date keys from days.toml
 * @returns Array of Date objects in chronological order
 */
function extractDates(): Date[] {
  const dateKeys = Object.keys(rawDays);
  return dateKeys
    .map(key => new Date(`${key}T00:00:00-07:00`)) // Parse with Pacific timezone
    .sort((a, b) => a.getTime() - b.getTime());
}

// Run validation on import
validateDates();

/**
 * Main festival dates object - computed once at build time
 */
export const festivalDates: FestivalDates = (() => {
  const dates = extractDates();

  if (dates.length === 0) {
    throw new Error('No dates found in days.toml');
  }

  return {
    startDate: dates[0],
    endDate: dates[dates.length - 1],
    dates,
    year: dates[0].getFullYear(),
  };
})();

/**
 * Formats date range for display
 *
 * Examples:
 * - Same month: "May 30-31, 2026"
 * - Different months: "May 30 - June 1, 2026"
 *
 * @param startDate - Start date (defaults to festival start)
 * @param endDate - End date (defaults to festival end)
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: Date = festivalDates.startDate,
  endDate: Date = festivalDates.endDate
): string {
  const startMonth = startDate.toLocaleDateString('en-US', {
    month: 'long',
    timeZone: 'UTC'
  });
  const startDay = startDate.getDate();

  const endMonth = endDate.toLocaleDateString('en-US', {
    month: 'long',
    timeZone: 'UTC'
  });
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`;
  }

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

/**
 * Formats first festival date for countdown component
 *
 * Example: "May 30, 2026"
 *
 * @param date - Date to format (defaults to festival start)
 * @returns Formatted date string for countdown
 */
export function formatCountdownDate(date: Date = festivalDates.startDate): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

/**
 * Formats date as ISO string with Pacific timezone offset
 *
 * @param date - Date to format
 * @param time - Time string (HH:MM:SS format)
 * @returns ISO formatted string with timezone
 *
 * @example
 * formatISO(new Date('2026-05-30'), '00:00:00')
 * // Returns: "2026-05-30T00:00:00-07:00"
 */
export function formatISO(date: Date, time: string = '00:00:00'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T${time}-07:00`;
}

/**
 * Formats festival start time for Open Graph metadata
 *
 * @returns ISO formatted start time string
 */
export function getOpenGraphStartTime(): string {
  return formatISO(festivalDates.startDate, '00:00:00');
}

/**
 * Formats festival end time for Open Graph metadata
 *
 * @returns ISO formatted end time string
 */
export function getOpenGraphEndTime(): string {
  return formatISO(festivalDates.endDate, '23:59:59');
}

/**
 * Calculates Thursday kickoff event date (day before festival)
 *
 * @returns Object with Thursday date and formatted strings
 */
export function getThursdayKickoff(): {
  date: Date;
  formatted: string;
  monthDay: string;
} {
  const thursdayDate = new Date(festivalDates.startDate);
  thursdayDate.setDate(thursdayDate.getDate() - 1);

  return {
    date: thursdayDate,
    formatted: thursdayDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    }),
    monthDay: `${thursdayDate.toLocaleDateString('en-US', {
      month: 'long',
      timeZone: 'UTC'
    })} ${thursdayDate.getDate()}`
  };
}

/**
 * Formats individual dates for story content
 *
 * Example: "May 30: TBD, May 31: TBD, and June 1: TBD"
 *
 * @returns Formatted story dates string
 */
export function formatStoryDates(): string {
  const dateStrings = festivalDates.dates.map(date => {
    const month = date.toLocaleDateString('en-US', {
      month: 'long',
      timeZone: 'UTC'
    });
    const day = date.getDate();
    return `${month} ${day}: TBD`;
  });

  if (dateStrings.length === 0) return '';
  if (dateStrings.length === 1) return dateStrings[0];
  if (dateStrings.length === 2) return `${dateStrings[0]} and ${dateStrings[1]}`;

  // For 3+ dates: "Date1, Date2, and Date3"
  const lastDate = dateStrings[dateStrings.length - 1];
  const otherDates = dateStrings.slice(0, -1).join(', ');
  return `${otherDates}, and ${lastDate}`;
}

/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateTimeLeft } from './CountdownTimerIsland.js';

describe('calculateTimeLeft', () => {
  let mockDateNow: ReturnType<typeof vi.spyOn>;
  const FIXED_TIMESTAMP = 1735689600000; // Jan 1, 2025 00:00:00 UTC

  beforeEach(() => {
    mockDateNow = vi.spyOn(Date, 'now').mockReturnValue(FIXED_TIMESTAMP);
  });

  afterEach(() => {
    mockDateNow.mockRestore();
  });

  describe('Edge Cases', () => {
    it('should return negative values when endDate is in the past', () => {
      // Set endDate to be 1 hour in the past
      const oneHourInMs = 60 * 60 * 1000;
      const endDate = FIXED_TIMESTAMP - oneHourInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: -1,
        hours: -1,
        minutes: -0,
        seconds: -0,
      });
    });

    it('should return all zeros when endDate equals current time', () => {
      // Set endDate to be exactly equal to current time
      const endDate = FIXED_TIMESTAMP;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    });

    it('should return negative values when endDate is just past by milliseconds', () => {
      // Set endDate to be 1 millisecond in the past
      const endDate = FIXED_TIMESTAMP - 1;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: -1,
        hours: -1,
        minutes: -1,
        seconds: -1,
      });
    });

    it('should floor fractional seconds for future dates', () => {
      // Set endDate to be 30.7 seconds in the future (30700 milliseconds)
      const endDate = FIXED_TIMESTAMP + 30700;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 30, // Should be floored, not 31
      });
    });
  });

  describe('Happy Path', () => {
    it('should calculate correct time left for future date with mixed time units', () => {
      // Set endDate to be exactly 2 days, 5 hours, 30 minutes, and 45 seconds in the future
      const days = 2;
      const hours = 5;
      const minutes = 30;
      const seconds = 45;

      const timeInMs = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 2,
        hours: 5,
        minutes: 30,
        seconds: 45,
      });
    });

    it('should calculate correct time left for future date with only days', () => {
      // Set endDate to be exactly 7 days in the future
      const days = 7;
      const timeInMs = days * 24 * 60 * 60 * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 7,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    });

    it('should calculate correct time left for future date with only hours', () => {
      // Set endDate to be exactly 3 hours in the future
      const hours = 3;
      const timeInMs = hours * 60 * 60 * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 0,
        hours: 3,
        minutes: 0,
        seconds: 0,
      });
    });

    it('should calculate correct time left for future date with only minutes', () => {
      // Set endDate to be exactly 45 minutes in the future
      const minutes = 45;
      const timeInMs = minutes * 60 * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 0,
        hours: 0,
        minutes: 45,
        seconds: 0,
      });
    });

    it('should calculate correct time left for future date with only seconds', () => {
      // Set endDate to be exactly 30 seconds in the future
      const seconds = 30;
      const timeInMs = seconds * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 30,
      });
    });
  });

  describe('Boundary Conditions', () => {
    it('should calculate correct time left for exactly 24 hours', () => {
      // Set endDate to be exactly 24 hours in the future
      const hours = 24;
      const timeInMs = hours * 60 * 60 * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    });

    it('should calculate correct time left for 23 hours 59 minutes 59 seconds', () => {
      // Set endDate to be 23:59:59 in the future (just before rolling over to 1 day)
      const hours = 23;
      const minutes = 59;
      const seconds = 59;
      const timeInMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 0,
        hours: 23,
        minutes: 59,
        seconds: 59,
      });
    });

    it('should calculate correct time left for large time difference', () => {
      // Set endDate to be exactly 365 days in the future
      const days = 365;
      const timeInMs = days * 24 * 60 * 60 * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 365,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    });
  });

  describe('Time Rollover', () => {
    it('should handle time units rolling over correctly', () => {
      // Set endDate to be 1 day, 25 hours, 61 minutes, and 61 seconds in the future
      // This should roll over to: 2 days, 2 hours, 2 minutes, 1 second
      const days = 1;
      const hours = 25; // 25 hours = 1 day + 1 hour
      const minutes = 61; // 61 minutes = 1 hour + 1 minute
      const seconds = 61; // 61 seconds = 1 minute + 1 second

      const timeInMs = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
      const endDate = FIXED_TIMESTAMP + timeInMs;

      const result = calculateTimeLeft(endDate);

      expect(result).toEqual({
        days: 2,
        hours: 2,
        minutes: 2,
        seconds: 1,
      });
    });
  });
});

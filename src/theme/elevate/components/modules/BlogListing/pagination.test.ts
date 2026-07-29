import { describe, test, expect } from 'vitest';
import { standardizePathName, buildPaginationNumbers } from './pagination.js';

describe('Pagination utilities', () => {
  describe('standardizePathName', () => {
    test('should return empty string for root path', () => {
      expect(standardizePathName('/')).toBe('');
    });

    test('should return the same path for non-root paths', () => {
      expect(standardizePathName('/blog')).toBe('/blog');
    });

    test('should handle nested paths', () => {
      expect(standardizePathName('/blog/category')).toBe('/blog/category');
    });

    test('should handle paths with trailing slash', () => {
      expect(standardizePathName('/blog/')).toBe('/blog/');
    });

    test('should handle complex nested paths', () => {
      expect(standardizePathName('/blog/category/subcategory')).toBe('/blog/category/subcategory');
    });

    test('should handle paths with query parameters', () => {
      expect(standardizePathName('/blog?param=value')).toBe('/blog?param=value');
    });

    test('should handle empty string input', () => {
      expect(standardizePathName('')).toBe('');
    });
  });

  describe('buildPaginationNumbers', () => {
    describe('when total pages is small (≤ 3)', () => {
      test('should return all pages when totalPageCount is 1', () => {
        const result = buildPaginationNumbers(1, 1);
        expect(result.pagesToDisplay).toEqual([1]);
        expect(result.displayFirstNumber).toBe(false);
        expect(result.displayLastNumber).toBe(false);
        expect(result.displayPreviousEllipsis).toBe(false);
        expect(result.displayNextEllipsis).toBe(false);
      });

      test('should return all pages when totalPageCount is 3', () => {
        const result = buildPaginationNumbers(2, 3);
        expect(result.pagesToDisplay).toEqual([1, 2, 3]);
        expect(result.displayFirstNumber).toBe(false);
        expect(result.displayLastNumber).toBe(false);
        expect(result.displayPreviousEllipsis).toBe(false);
        expect(result.displayNextEllipsis).toBe(false);
      });
    });

    describe('when current page is at the beginning', () => {
      test('should show first pages + ellipsis + last when currentPage is 1', () => {
        const result = buildPaginationNumbers(1, 10);
        expect(result.pagesToDisplay).toEqual([1, 2, 3]);
        expect(result.displayFirstNumber).toBe(false);
        expect(result.displayLastNumber).toBe(true);
        expect(result.displayPreviousEllipsis).toBe(false);
        expect(result.displayNextEllipsis).toBe(true);
      });

      test('should handle edge case when currentPage equals threshold', () => {
        const result = buildPaginationNumbers(1, 7);
        expect(result.pagesToDisplay).toEqual([1, 2, 3]);
        expect(result.displayLastNumber).toBe(true);
        expect(result.displayNextEllipsis).toBe(true);
      });
    });

    describe('when current page is at the end', () => {
      test('should show first + ellipsis + last pages when currentPage is last', () => {
        const result = buildPaginationNumbers(10, 10);
        expect(result.pagesToDisplay).toEqual([8, 9, 10]);
        expect(result.displayFirstNumber).toBe(true);
        expect(result.displayLastNumber).toBe(false);
        expect(result.displayPreviousEllipsis).toBe(true);
        expect(result.displayNextEllipsis).toBe(false);
      });

      test('should handle edge case when currentPage equals totalPageCount - threshold', () => {
        const result = buildPaginationNumbers(9, 10); // 9 >= 10 - 1 = 9 (triggers end pages logic)
        expect(result.pagesToDisplay).toEqual([8, 9, 10]);
        expect(result.displayFirstNumber).toBe(true);
        expect(result.displayLastNumber).toBe(false);
        expect(result.displayPreviousEllipsis).toBe(true);
        expect(result.displayNextEllipsis).toBe(false);
      });
    });

    describe('when current page is in the middle', () => {
      test('should show first + ellipsis + middle pages + ellipsis + last', () => {
        const result = buildPaginationNumbers(5, 10);
        expect(result.pagesToDisplay).toEqual([4, 5, 6]);
        expect(result.displayFirstNumber).toBe(true);
        expect(result.displayLastNumber).toBe(true);
        expect(result.displayPreviousEllipsis).toBe(true);
        expect(result.displayNextEllipsis).toBe(true);
      });

      test('should handle middle page in larger set', () => {
        const result = buildPaginationNumbers(7, 15);
        expect(result.pagesToDisplay).toEqual([6, 7, 8]);
        expect(result.displayFirstNumber).toBe(true);
        expect(result.displayLastNumber).toBe(true);
        expect(result.displayPreviousEllipsis).toBe(true);
        expect(result.displayNextEllipsis).toBe(true);
      });
    });

    describe('edge cases around threshold boundaries', () => {
      /*
       * UX optimization: When current page is close to the beginning (page 2 of 10),
       * avoid showing redundant ellipsis that would create: [1] ... [1] [2] [3] ... [10]
       * Instead, show the cleaner: [1] [2] [3] ... [10]
       */

      test('should not show previous ellipsis when currentPage is threshold + 1', () => {
        const result = buildPaginationNumbers(2, 10); // threshold is 1, so 1 + 1 = 2
        expect(result.pagesToDisplay).toEqual([1, 2, 3]);
        expect(result.displayFirstNumber).toBe(false);
        expect(result.displayLastNumber).toBe(true);
        expect(result.displayPreviousEllipsis).toBe(false);
        expect(result.displayNextEllipsis).toBe(true);
      });

      /*
       * UX optimization: When current page is close to the end (page 8 of 10),
       * avoid showing redundant ellipsis that would create: [1] ... [7] [8] [9] ... [10]
       * Instead, show the cleaner: [1] ... [7] [8] [9] [10]
       */

      test('should not show next ellipsis when currentPage is totalPageCount - threshold - 1', () => {
        const result = buildPaginationNumbers(8, 10); // 10 - 1 - 1 = 8 (middle pages, no next ellipsis)
        expect(result.pagesToDisplay).toEqual([7, 8, 9]);
        expect(result.displayFirstNumber).toBe(true);
        expect(result.displayLastNumber).toBe(true);
        expect(result.displayPreviousEllipsis).toBe(true);
        expect(result.displayNextEllipsis).toBe(false);
      });
    });

    describe('boundary edge cases', () => {
      test('should handle large page counts', () => {
        const result = buildPaginationNumbers(50, 100);
        expect(result.pagesToDisplay).toEqual([49, 50, 51]);
        expect(result.displayFirstNumber).toBe(true);
        expect(result.displayLastNumber).toBe(true);
        expect(result.displayPreviousEllipsis).toBe(true);
        expect(result.displayNextEllipsis).toBe(true);
      });
    });
  });
});

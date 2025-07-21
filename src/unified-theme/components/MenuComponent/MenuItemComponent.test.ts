import { describe, it, expect } from 'vitest';
import { isCrossPageAnchor, getAnchorFromUrl } from './MenuItemComponent.js';

describe('getAnchorFromUrl', () => {
  it('should extract hash from full URL', () => {
    expect(getAnchorFromUrl('https://example.com/page#section')).toBe('#section');
    expect(getAnchorFromUrl('https://example.com/page#section-with-dashes')).toBe('#section-with-dashes');
    expect(getAnchorFromUrl('https://example.com/page#section_with_underscores')).toBe('#section_with_underscores');
  });

  it('should extract hash from relative URL', () => {
    expect(getAnchorFromUrl('/page#section')).toBe('#section');
    expect(getAnchorFromUrl('/nested/page#section')).toBe('#section');
    expect(getAnchorFromUrl('page#section')).toBe('#section');
  });

  it('should extract hash from pure anchor', () => {
    expect(getAnchorFromUrl('#section')).toBe('#section');
    expect(getAnchorFromUrl('#')).toBe('#');
  });

  it('should return empty string for URLs without hash', () => {
    expect(getAnchorFromUrl('https://example.com/page')).toBe('');
    expect(getAnchorFromUrl('/page')).toBe('');
    expect(getAnchorFromUrl('page')).toBe('');
  });

  it('should handle URLs with query parameters', () => {
    expect(getAnchorFromUrl('https://example.com/page?param=value#section')).toBe('#section');
    expect(getAnchorFromUrl('/page?param=value#section')).toBe('#section');
  });

  it('should handle malformed URLs gracefully', () => {
    expect(getAnchorFromUrl('not-a-url#section')).toBe('#section');
    expect(getAnchorFromUrl('://malformed#section')).toBe('#section');
  });

  it('should handle empty and null inputs', () => {
    expect(getAnchorFromUrl('')).toBe('');
    expect(getAnchorFromUrl(null)).toBe('');
    expect(getAnchorFromUrl(undefined)).toBe('');
  });
});

describe('isCrossPageAnchor', () => {
  describe('URLs without anchors', () => {
    it('should return false for URLs without hash', () => {
      expect(isCrossPageAnchor('https://example.com/page')).toBe(false);
      expect(isCrossPageAnchor('/page')).toBe(false);
      expect(isCrossPageAnchor('page')).toBe(false);
      expect(isCrossPageAnchor('https://example.com')).toBe(false);
    });

    it('should return false for empty or null inputs', () => {
      expect(isCrossPageAnchor('')).toBe(false);
      expect(isCrossPageAnchor(null)).toBe(false);
      expect(isCrossPageAnchor(undefined)).toBe(false);
    });
  });

  describe('Pure anchor links (same-page)', () => {
    it('should return false for pure anchor links', () => {
      expect(isCrossPageAnchor('#section')).toBe(false);
      expect(isCrossPageAnchor('#section-with-dashes')).toBe(false);
      expect(isCrossPageAnchor('#section_with_underscores')).toBe(false);
      expect(isCrossPageAnchor('#123')).toBe(false);
    });

    it('should return false for empty hash', () => {
      expect(isCrossPageAnchor('#')).toBe(false);
    });
  });

  describe('Cross-page anchor detection', () => {
    it('should return true for full URLs with different domains', () => {
      expect(isCrossPageAnchor('https://example.com/page#section')).toBe(true);
      expect(isCrossPageAnchor('https://different-domain.com/some/path#anchor')).toBe(true);
    });

    it('should return true for relative URLs with different paths', () => {
      expect(isCrossPageAnchor('/case-studies/science-and-technology#section')).toBe(true);
      expect(isCrossPageAnchor('/some/deep/nested/path#anchor')).toBe(true);
      expect(isCrossPageAnchor('/pricing#features')).toBe(true);
      expect(isCrossPageAnchor('/about-us#team')).toBe(true);
    });

    it('should return true for URLs with query parameters', () => {
      expect(isCrossPageAnchor('/page?param=value#section')).toBe(true);
      expect(isCrossPageAnchor('/search?q=test&category=all#results')).toBe(true);
    });
  });
});

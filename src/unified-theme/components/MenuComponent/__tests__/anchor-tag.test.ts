import { describe, it, expect } from 'vitest';
import { getAnchorFromUrl, isCrossPageAnchor } from '../MenuItemComponent.js';

describe('getAnchorFromUrl', () => {
  it('extracts hash from a full URL', () => {
    expect(getAnchorFromUrl('https://example.com/page#section')).toBe('#section');
  });

  it('extracts hash from a relative URL', () => {
    expect(getAnchorFromUrl('/page#section')).toBe('#section');
  });

  it('returns empty string for URL without hash', () => {
    expect(getAnchorFromUrl('https://example.com/page')).toBe('');
  });

  it('returns the hash when input is just a hash', () => {
    expect(getAnchorFromUrl('#section')).toBe('#section');
  });

  it('returns empty string for invalid URL without hash', () => {
    expect(getAnchorFromUrl('not-a-url')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(getAnchorFromUrl('')).toBe('');
  });
});

describe('isCrossPageAnchor', () => {
  beforeEach(() => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'https://example.com',
        pathname: '/current-page',
      },
      writable: true,
    });
  });

  it('returns false for URLs without hash', () => {
    expect(isCrossPageAnchor('https://example.com/page')).toBe(false);
  });

  it('returns false for same-page anchors', () => {
    expect(isCrossPageAnchor('#section')).toBe(false);
  });

  it('returns true for cross-page anchors with full URL', () => {
    expect(isCrossPageAnchor('https://example.com/other-page#section')).toBe(true);
  });

  it('returns true for cross-page anchors with relative URL', () => {
    expect(isCrossPageAnchor('/other-page#section')).toBe(true);
  });

  it('returns false for same-page relative URL', () => {
    expect(isCrossPageAnchor('/current-page#section')).toBe(false);
  });

  it('returns false for empty input', () => {
    expect(isCrossPageAnchor('')).toBe(false);
  });
});

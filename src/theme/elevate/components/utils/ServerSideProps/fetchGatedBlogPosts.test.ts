import { describe, test, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest';
import fetchGatedPosts, { FetchGatedPostsProps, cleanHostName } from './fetchGatedBlogPosts.js';
import { URLWithoutQuery } from '@hubspot/cms-components';

const mockFetch = vi.fn();

const createMockUrl = (hostname: string): URLWithoutQuery => ({
  host: hostname,
  hostname,
  href: `https://${hostname}/`,
  origin: `https://${hostname}`,
  pathname: '/',
  port: '',
  protocol: 'https:',
  toString: () => `https://${hostname}/`,
  toJSON: () => `https://${hostname}/`,
  hasNoQuery: true,
});

const createInvalidUrl = (): URLWithoutQuery => ({
  ...createMockUrl('example.com'),
  hostname: undefined as any,
});

describe('fetchGatedPosts', () => {
  beforeAll(() => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(mockFetch);
    vi.spyOn(console, 'warn');
    vi.spyOn(console, 'error');
  });

  beforeEach(() => {
    // Clear all mocks before each test to ensure clean state
    vi.clearAllMocks();
  });

  afterAll(() => {
    // Restore all mocks after all tests are complete
    vi.restoreAllMocks();
  });

  describe('when blog post IDs are missing or empty', () => {
    test('returns empty array when hublData is missing', async () => {
      const props = {} as FetchGatedPostsProps;
      const url = createMockUrl('example.com');

      const result = await fetchGatedPosts(props, { url });

      expect(result).toEqual({
        serverSideProps: { gatedContentIds: [] },
        caching: {
          cacheControl: {
            maxAge: 60,
          },
        },
      });
      expect(console.warn).toHaveBeenCalledWith('No blog post IDs provided');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    test('returns empty array when blogPostIds is missing', async () => {
      const props = {
        hublData: {},
      } as FetchGatedPostsProps;
      const url = createMockUrl('example.com');

      const result = await fetchGatedPosts(props, { url });

      expect(result).toEqual({
        serverSideProps: { gatedContentIds: [] },
        caching: {
          cacheControl: {
            maxAge: 60,
          },
        },
      });
      expect(console.warn).toHaveBeenCalledWith('No blog post IDs provided');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    test('returns empty array when blogPostIds is empty array', async () => {
      const props = {
        hublData: {
          blogPostIds: [],
        },
      } as FetchGatedPostsProps;
      const url = createMockUrl('example.com');

      const result = await fetchGatedPosts(props, { url });

      expect(result).toEqual({
        serverSideProps: { gatedContentIds: [] },
        caching: {
          cacheControl: {
            maxAge: 60,
          },
        },
      });
      expect(console.warn).toHaveBeenCalledWith('No blog post IDs provided');
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('when URL validation fails', () => {
    test('throws error when URL is missing', async () => {
      const props = {
        hublData: {
          blogPostIds: [1, 2, 3],
        },
      } as FetchGatedPostsProps;

      await expect(fetchGatedPosts(props, { url: undefined as any })).rejects.toThrow('Missing hostname in URL');
    });

    test('throws error when hostname is missing', async () => {
      const props = {
        hublData: {
          blogPostIds: [1, 2, 3],
        },
      } as FetchGatedPostsProps;

      const invalidUrl = createInvalidUrl();
      await expect(fetchGatedPosts(props, { url: invalidUrl })).rejects.toThrow('Missing hostname in URL');
    });
  });

  describe('when making API calls', () => {
    test('successfully fetches gated content IDs', async () => {
      const props = {
        hublData: {
          blogPostIds: [1, 2, 3],
        },
      } as FetchGatedPostsProps;
      const url = createMockUrl('example.com');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            gatedContentIds: [1, 3],
            metadata: {
              totalCount: 2,
              requestId: 'abc-123-def',
            },
            timestamp: '2024-01-01T00:00:00Z',
          }),
      });

      const result = await fetchGatedPosts(props, { url });

      expect(mockFetch).toHaveBeenCalledWith('https://example.com/_hcms/content-access/get-gated-content-ids-for-member', {
        method: 'POST',
        body: JSON.stringify({ contentIds: [1, 2, 3] }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(result).toEqual({
        serverSideProps: { gatedContentIds: [1, 3] },
        caching: {
          cacheControl: {
            maxAge: 60,
          },
        },
      });
    });

    test('handles non-200 response', async () => {
      const props = {
        hublData: {
          blogPostIds: [1, 2, 3],
        },
      } as FetchGatedPostsProps;
      const url = createMockUrl('example.com');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await fetchGatedPosts(props, { url });

      expect(result).toEqual({
        serverSideProps: { gatedContentIds: [] },
        caching: {
          cacheControl: {
            maxAge: 60,
          },
        },
      });
      expect(console.error).toHaveBeenCalledWith('Error fetching gated posts:', expect.any(Error));
    });

    test('handles invalid response format', async () => {
      const props = {
        hublData: {
          blogPostIds: [1, 2, 3],
        },
      } as FetchGatedPostsProps;
      const url = createMockUrl('example.com');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ invalidFormat: true }),
      });

      const result = await fetchGatedPosts(props, { url });

      expect(result).toEqual({
        serverSideProps: { gatedContentIds: [] },
        caching: {
          cacheControl: {
            maxAge: 60,
          },
        },
      });
      expect(console.error).toHaveBeenCalledWith('Error fetching gated posts:', expect.any(Error));
    });

    test('handles network errors', async () => {
      const props = {
        hublData: {
          blogPostIds: [1, 2, 3],
        },
      } as FetchGatedPostsProps;
      const url = createMockUrl('example.com');

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchGatedPosts(props, { url });

      expect(result).toEqual({
        serverSideProps: { gatedContentIds: [] },
        caching: {
          cacheControl: {
            maxAge: 60,
          },
        },
      });
      expect(console.error).toHaveBeenCalledWith('Error fetching gated posts:', expect.any(Error));
    });

    test('correctly handles hslocal.net in hostname', async () => {
      const props = { hublData: { blogPostIds: [1] } } as FetchGatedPostsProps;
      const url = createMockUrl('test.hslocal.net');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            gatedContentIds: [1, 3],
            metadata: {
              totalCount: 0,
              requestId: 'xyz-456-ghi',
            },
          }),
      });

      await fetchGatedPosts(props, { url });

      expect(mockFetch).toHaveBeenCalledWith('https://test/_hcms/content-access/get-gated-content-ids-for-member', {
        method: 'POST',
        body: JSON.stringify({ contentIds: [1] }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });
});

describe('cleanHostName', () => {
  test('removes .hslocal.net from hostname', () => {
    expect(cleanHostName('test.hslocal.net')).toBe('test');
    expect(cleanHostName('dev.hslocal.net')).toBe('dev');
    expect(cleanHostName('my-site.hslocal.net')).toBe('my-site');
  });

  test('keeps hostname unchanged when not .hslocal.net', () => {
    expect(cleanHostName('example.com')).toBe('example.com');
    expect(cleanHostName('test.hubspot.com')).toBe('test.hubspot.com');
    expect(cleanHostName('local.dev')).toBe('local.dev');
  });

  test('handles special local development cases', () => {
    expect(cleanHostName('')).toBe('');
    expect(cleanHostName('localhost.hslocal.net')).toBe('localhost');
    expect(cleanHostName('127-0-0-1.hslocal.net')).toBe('127-0-0-1');
  });
});

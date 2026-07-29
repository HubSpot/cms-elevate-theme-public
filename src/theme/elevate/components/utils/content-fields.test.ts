import { describe, test, expect } from 'vitest';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from './content-fields.js';
import { LinkFieldType } from '@hubspot/cms-components/fields';

describe('getLinkFieldHref', () => {
  test('returns mailto link for EMAIL_ADDRESS type', () => {
    const fieldValue: LinkFieldType['default'] = {
      url: { href: 'test@example.com', type: 'EMAIL_ADDRESS', content_id: 1 },
    };
    expect(getLinkFieldHref(fieldValue)).toBe('mailto:test@example.com');
  });

  test('returns payment link for PAYMENT type', () => {
    const fieldValue: LinkFieldType['default'] = {
      url: { href: 'payment-link', type: 'PAYMENT', content_id: 2 },
    };
    expect(getLinkFieldHref(fieldValue)).toBe('payment-link?referrer=CMS_MODULE_NEWTAB');
  });

  test('returns regular link for other types', () => {
    const fieldValue: LinkFieldType['default'] = {
      url: { href: 'http://example.com', type: 'OTHER', content_id: 3 },
    };
    expect(getLinkFieldHref(fieldValue)).toBe('http://example.com');
  });

  test('returns undefined for invalid field value', () => {
    expect(getLinkFieldHref(null)).toBeUndefined();
    expect(getLinkFieldHref({} as LinkFieldType['default'])).toBeUndefined();
  });
});

describe('getLinkFieldRel', () => {
  test('returns noopener noreferrer when open_in_new_tab is true', () => {
    const fieldValue: LinkFieldType['default'] = {
      open_in_new_tab: true,
      no_follow: false,
    };
    expect(getLinkFieldRel(fieldValue)).toBe('noopener noreferrer');
  });

  test('returns nofollow for when no_follow is true', () => {
    const fieldValue: LinkFieldType['default'] = {
      open_in_new_tab: false,
      no_follow: true,
    };
    expect(getLinkFieldRel(fieldValue)).toBe('nofollow');
  });

  test('returns noopener noreferrer nofollow for when both open_in_new_tab and no_follow are true', () => {
    const fieldValue: LinkFieldType['default'] = {
      open_in_new_tab: true,
      no_follow: true,
    };
    expect(getLinkFieldRel(fieldValue)).toBe('noopener noreferrer nofollow');
  });

  test('returns empty string when open_in_new_tab and no_follow false ', () => {
    const fieldValue: LinkFieldType['default'] = {
      open_in_new_tab: false,
      no_follow: false,
    };
    expect(getLinkFieldRel(fieldValue)).toBe('');
  });
});

describe('getLinkFieldTarget', () => {
  test('returns empty string for null/undefined field value', () => {
    expect(getLinkFieldTarget(null)).toBe('');
    expect(getLinkFieldTarget(undefined)).toBe('');
  });

  test('returns _blank when open_in_new_tab is true', () => {
    const fieldValue: LinkFieldType['default'] = {
      open_in_new_tab: true,
    };
    expect(getLinkFieldTarget(fieldValue)).toBe('_blank');
  });

  test('returns empty string when open_in_new_tab is false', () => {
    const fieldValue: LinkFieldType['default'] = {
      open_in_new_tab: false,
    };
    expect(getLinkFieldTarget(fieldValue)).toBe('');
  });

  test('returns empty string when open_in_new_tab property is missing', () => {
    const fieldValue: LinkFieldType['default'] = {
      url: { href: 'http://example.com', type: 'EXTERNAL', content_id: 1 },
    };
    expect(getLinkFieldTarget(fieldValue)).toBe('');
  });
});

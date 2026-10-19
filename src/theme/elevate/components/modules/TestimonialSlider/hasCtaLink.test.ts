import { describe, it, expect } from 'vitest';
import { hasCtaLink } from './hasCtaLink.js';
import { buildSliderProps, buildTestimonial } from './testFixtures.js';

describe('hasCtaLink', () => {
  it('returns false when no testimonial links to a CTA', () => {
    expect(hasCtaLink(buildSliderProps(['EXTERNAL', 'CONTENT', 'PAYMENT']))).toBe(false);
  });

  it('returns true when at least one testimonial links to a CTA', () => {
    expect(hasCtaLink(buildSliderProps(['EXTERNAL', 'CALL_TO_ACTION']))).toBe(true);
  });

  it('returns false when there are no testimonials', () => {
    expect(hasCtaLink(buildSliderProps([]))).toBe(false);
  });

  it('handles testimonials with missing link values', () => {
    const testimonial = buildTestimonial('EXTERNAL');
    const withoutLink = {
      ...testimonial,
      groupLink: { ...testimonial.groupLink, link: undefined },
    };
    const withoutUrl = {
      ...testimonial,
      groupLink: { ...testimonial.groupLink, link: { open_in_new_tab: false } },
    };
    expect(hasCtaLink({ groupTestimonial: [withoutLink, withoutUrl] })).toBe(false);
  });
});

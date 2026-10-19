import { TestimonialSliderProps } from './types.js';

export function hasCtaLink(props: Pick<TestimonialSliderProps, 'groupTestimonial'>): boolean {
  return (props.groupTestimonial ?? []).some(testimonial => testimonial?.groupLink?.link?.url?.type === 'CALL_TO_ACTION');
}

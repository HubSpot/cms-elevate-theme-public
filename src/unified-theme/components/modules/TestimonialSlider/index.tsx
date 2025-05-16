import { ModuleMeta } from '../../types/modules.js';
import { Island } from '@hubspot/cms-components';
// @ts-expect-error -- ?island not typed
import TestimonialSlider from './islands/TestimonialSliderIsland.js?island';
import { TestimonialSliderProps } from './types.js';
import insertQuoteIconSvg from './assets/insert-quote.svg';

export const Component = (props: TestimonialSliderProps) => {
  return (
    <Island
      hydrateOn="load"
      module={TestimonialSlider}
      groupTestimonial={props.groupTestimonial}
      groupStyle={props.groupStyle}
      groupDefaultText={props.groupDefaultText}
      clientOnly={true}
    />
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Testimonial slider',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: insertQuoteIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/testimonial_slider',
  version: 0,
  themeModule: true,
};

import { ModuleMeta } from '../../types/modules.js';
import { Island } from '@hubspot/cms-components';
// @ts-ignore -- ?island not typed
import TestimonialSlider from './islands/TestimonialSliderIsland.js?island';
import { TestimonialSliderProps } from './types.js';
import insertQuoteIconSvg from './assets/insert-quote.svg';
import { hasCtaLink } from './hasCtaLink.js';

export const Component = (props: TestimonialSliderProps) => {
  const ctaLinks = (props.groupTestimonial ?? [])
    .map(testimonial => testimonial?.groupLink?.link?.url)
    .filter(url => url?.type === 'CALL_TO_ACTION' && url.content_id)
    .filter((url, index, urls) => urls.slice(0, index).every(other => String(other.content_id) !== String(url.content_id)));

  return (
    <>
      {hasCtaLink(props) &&
        ctaLinks.map(url => (
          <div key={url.content_id} hidden aria-hidden="true" style={{ display: 'none' }}>
            <a href={url.href || undefined} className={`hs-cta-trigger-button hs-cta-trigger-button-${url.content_id}`} data-hubspot-cta-id={url.content_id} />
          </div>
        ))}
      <Island
        hydrateOn="load"
        module={TestimonialSlider}
        moduleName={props.moduleName}
        groupTestimonial={props.groupTestimonial}
        groupStyle={props.groupStyle}
        groupDefaultText={props.groupDefaultText}
        clientOnly={true}
      />
    </>
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

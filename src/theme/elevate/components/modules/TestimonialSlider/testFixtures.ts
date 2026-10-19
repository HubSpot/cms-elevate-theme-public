import { TestimonialContentProps, TestimonialSliderProps } from './types.js';

type LinkType = 'EXTERNAL' | 'CONTENT' | 'FILE' | 'EMAIL_ADDRESS' | 'CALL_TO_ACTION' | 'BLOG' | 'PAYMENT';

export function buildTestimonial(linkType: LinkType, index = 0): TestimonialContentProps {
  return {
    groupQuote: { quote: `Quote ${index}` },
    groupAuthor: {
      authorName: `Author ${index}`,
      authorTitle: '',
      authorImage: { src: '', alt: '', width: 100, height: 100 },
      testimonialIndex: index,
    },
    groupImage: {
      showImage: false,
      image: { src: '', alt: '', width: 100, height: 100 },
    },
    groupLink: {
      linkText: 'Learn more',
      link: {
        url: { href: 'https://example.com', type: linkType, content_id: linkType === 'CALL_TO_ACTION' ? String(100 + index) : null },
        open_in_new_tab: false,
        no_follow: false,
      },
      testimonialIndex: index,
    },
  } as TestimonialContentProps;
}

export function buildSliderProps(linkTypes: LinkType[]): TestimonialSliderProps {
  return {
    moduleName: 'testimonial_slider',
    groupTestimonial: linkTypes.map((linkType, index) => buildTestimonial(linkType, index)),
    groupStyle: { cardStyleVariant: 'card_variant_1' },
    groupDefaultText: {
      previousArrowAltText: 'Previous',
      nextArrowAltText: 'Next',
      navigateToSlideNumberAriaLabel: 'Go to slide {0}',
      navigateToPreviousSlideAriaLabel: 'Go to previous slide',
      navigateToNextSlideAriaLabel: 'Go to next slide',
      navigateToFirstSlideAriaLabel: 'Go to first slide',
      navigateToLastSlideAriaLabel: 'Go to last slide',
      carouselAriaLabel: 'Testimonials carousel',
      selectSlideNavigationAriaLabel: 'Select slide navigation',
      slideAriaLabel: 'Slide {0}',
      slideNumberOfSlidesTotalAriaLabel: '{0} of {1}',
    },
  } as TestimonialSliderProps;
}

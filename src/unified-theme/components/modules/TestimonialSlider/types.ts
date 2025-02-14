import {
  ImageFieldType,
  TextFieldType,
  LinkFieldType,
  BooleanFieldType,
} from '@hubspot/cms-components/fields';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';

// Types for the testimonial slider

export type TestimonialSliderProps = {
  groupTestimonial: TestimonialContentProps[];
  groupStyle: TestimonialStyleProps;
};

// Types for testimonial link

export type TestimonialLinkProps = {
  contentCentered?: boolean;
  linkText?: TextFieldType['default'];
  link?: LinkFieldType['default'];
};

// Types for testimonial author

export type TestimonialAuthorProps = {
  authorName?: TextFieldType['default'];
  authorTitle?: TextFieldType['default'];
  authorImage?: ImageFieldType['default'];
};

// Types for the testimonial meta

export type TestimonialMetaProps = TestimonialLinkProps & TestimonialAuthorProps;

// Types for testimonial image

export type TestimonialImageProps = {
  showImage?: BooleanFieldType['default'];
  image?: ImageFieldType['default'];
};

// Types for individual testimonial slide

export type TestimonialProps = TestimonialAuthorProps &
  TestimonialImageProps &
  TestimonialLinkProps & {
    quote: TextFieldType['default'];
  };

// Types for tesitmonial content

export type TestimonialContentProps = {
  groupQuote: {
    quote: TextFieldType['default'];
  };
  groupAuthor?: TestimonialAuthorProps;
  groupImage?: TestimonialImageProps;
  groupLink?: TestimonialLinkProps;
};

// Types for testimonial slide styles

export type TestimonialStyleProps = CardStyleFieldLibraryType;

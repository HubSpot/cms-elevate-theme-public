import { ModuleFields, RepeatedFieldGroup, FieldGroup, TextField, ImageField, BooleanField, LinkField } from '@hubspot/cms-components/fields';
import StyleFields from './styleFields.js';
import authorImage from './assets/author-avatar.png';
import testimonialImageOne from './assets/testimonial-image-1.png';
import testimonialImageTwo from './assets/testimonial-image-2.jpg';
import testimonialImageThree from './assets/testimonial-image-3.jpg';
import testimonialImageFour from './assets/testimonial-image-4.jpg';
import testimonialImageFive from './assets/testimonial-image-5.jpg';
import testimonialUserImageOne from './assets/testimonial-user-image-1.png';
import testimonialUserImageTwo from './assets/testimonial-user-image-2.png';
import testimonialUserImageThree from './assets/testimonial-user-image-3.png';
import testimonialUserImageFour from './assets/testimonial-user-image-4.png';
import testimonialUserImageFive from './assets/testimonial-user-image-5.png';

const defaultTestimonial = {
  groupQuote: {
    quote: '',
  },
  groupAuthor: {
    authorName: '',
    authorTitle: '',
    authorImage: {
      alt: '',
      max_height: 100,
      max_width: 100,
      size_type: 'auto_custom_max',
      src: authorImage,
    },
  },
  groupImage: {
    showImage: true,
    image: {
      alt: '',
      max_height: 315,
      max_width: 315,
      size_type: 'auto_custom_max',
      src: '',
    },
  },
  groupLink: {
    linkText: 'Read case study',
    link: {
      open_in_new_tab: true,
    },
  },
};

const testimonial1 = {
  ...defaultTestimonial,
  groupQuote: {
    quote: 'Add a testimonial quote #1 here. Keep it concise and impactful to enhance credibility with your business',
  },
  groupAuthor: {
    authorName: 'Customer name one',
    authorTitle: 'Customer role one',
    authorImage: {
      ...defaultTestimonial.groupAuthor.authorImage,
      src: testimonialUserImageOne,
    },
  },
  groupImage: {
    ...defaultTestimonial.groupImage,
    image: {
      ...defaultTestimonial.groupImage.image,
      src: testimonialImageOne,
    },
  },
};

const testimonial2 = {
  ...defaultTestimonial,
  groupQuote: {
    quote: 'Add a testimonial quote #2 here. Keep it concise and impactful to enhance credibility with your business',
  },
  groupAuthor: {
    authorName: 'Customer name two',
    authorTitle: 'Customer role two',
    authorImage: {
      ...defaultTestimonial.groupAuthor.authorImage,
      src: testimonialUserImageTwo,
    },
  },
  groupImage: {
    ...defaultTestimonial.groupImage,
    image: {
      ...defaultTestimonial.groupImage.image,
      src: testimonialImageTwo,
    },
  },
};

const testimonial3 = {
  ...defaultTestimonial,
  groupQuote: {
    quote: 'Add a testimonial quote #3 here. Keep it concise and impactful to enhance credibility with your business',
  },
  groupAuthor: {
    authorName: 'Customer name three',
    authorTitle: 'Customer role three',
    authorImage: {
      ...defaultTestimonial.groupAuthor.authorImage,
      src: testimonialUserImageThree,
    },
  },
  groupImage: {
    ...defaultTestimonial.groupImage,
    image: {
      ...defaultTestimonial.groupImage.image,
      src: testimonialImageThree,
    },
  },
};

const testimonial4 = {
  ...defaultTestimonial,
  groupQuote: {
    quote: 'Add a testimonial quote #4 here. Keep it concise and impactful to enhance credibility with your business',
  },
  groupAuthor: {
    authorName: 'Customer name four',
    authorTitle: 'Customer role four',
    authorImage: {
      ...defaultTestimonial.groupAuthor.authorImage,
      src: testimonialUserImageFour,
    },
  },
  groupImage: {
    ...defaultTestimonial.groupImage,
    image: {
      ...defaultTestimonial.groupImage.image,
      src: testimonialImageFour,
    },
  },
};

const testimonial5 = {
  ...defaultTestimonial,
  groupQuote: {
    quote: 'Add a testimonial quote #5 here. Keep it concise and impactful to enhance credibility with your business',
  },
  groupAuthor: {
    authorName: 'Customer name five',
    authorTitle: 'Customer role five',
    authorImage: {
      ...defaultTestimonial.groupAuthor.authorImage,
      src: testimonialUserImageFive,
    },
  },
  groupImage: {
    ...defaultTestimonial.groupImage,
    image: {
      ...defaultTestimonial.groupImage.image,
      src: testimonialImageFive,
    },
  },
};

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      label="Testimonial"
      name="groupTestimonial"
      occurrence={{
        min: 1,
        max: 20,
        default: 3,
      }}
      default={[testimonial1, testimonial2, testimonial3, testimonial4, testimonial5]}
    >
      <FieldGroup label="Quote" name="groupQuote" display="inline">
        <TextField
          label="Quotation text"
          name="quote"
          required={true}
          default="The measurable results have transformed our business. Highly recommend for anyone looking to elevate their marketing game."
          inlineEditable={true}
        />
      </FieldGroup>
      <FieldGroup label="Author" name="groupAuthor" display="inline">
        <TextField label="Name" name="authorName" default="Sarah Johnson" inlineEditable={true} />
        <TextField label="Title" name="authorTitle" default="Chief Marketing Officer @ StellarForge" inlineEditable={true} />
        <ImageField
          label="Image"
          name="authorImage"
          resizable={false}
          responsive={false}
          showLoading={false}
          default={{
            alt: '',
            src: authorImage,
          }}
        />
      </FieldGroup>
      <FieldGroup label="Image" name="groupImage" display="inline">
        <BooleanField label="Show image" name="showImage" display="toggle" default={true} />
        <ImageField
          label="Image"
          name="image"
          resizable={false}
          responsive={false}
          showLoading={false}
          visibility={{
            controlling_field_path: 'groupTestimonial.groupImage.showImage',
            controlling_value_regex: 'true',
            operator: 'EQUAL',
          }}
          default={{
            alt: '',
            src: testimonialImageOne,
          }}
        />
      </FieldGroup>
      <FieldGroup label="Link" name="groupLink" display="inline">
        <TextField label="Link text" name="linkText" default="Read case study" inlineEditable={true} />
        <LinkField
          label="Link"
          name="link"
          supportedTypes={['EXTERNAL', 'CONTENT', 'FILE', 'EMAIL_ADDRESS', 'CALL_TO_ACTION', 'BLOG', 'PAYMENT']}
          default={{}}
        />
      </FieldGroup>
    </RepeatedFieldGroup>
    <FieldGroup label="Default text" name="groupDefaultText" locked={true}>
      <TextField label="Previous" name="previousArrowAltText" default="Previous" />
      <TextField label="Next" name="nextArrowAltText" default="Next" />
      <TextField label="Navigate to slide number" name="navigateToSlideNumberAriaLabel" default="Go to slide %s" />
      <TextField label="Navigate to prev slide" name="navigateToPreviousSlideAriaLabel" default="Go to previous slide" />
      <TextField label="Navigate to next slide" name="navigateToNextSlideAriaLabel" default="Go to next slide" />
      <TextField label="Navigate to first slide" name="navigateToFirstSlideAriaLabel" default="Go to first slide" />
      <TextField label="Navigate to last slide" name="navigateToLastSlideAriaLabel" default="Go to last slide" />
      <TextField label="Carousel" name="carouselAriaLabel" default="Carousel" />
      <TextField label="Select slide to show" name="selectSlideNavigationAriaLabel" default="Select a slide to show" />
      <TextField label="Slide" name="slideAriaLabel" default="Slide" />
      <TextField label="Slide num of slides total" name="slideNumberOfSlidesTotalAriaLabel" default="%s of %s" />
    </FieldGroup>
    <StyleFields />
  </ModuleFields>
);

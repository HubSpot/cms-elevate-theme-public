import {
  ModuleFields,
  FieldGroup,
  ImageField,
  TextField,
  RichTextField,
  LinkField,
  BooleanField,
  AdvancedVisibility,
  RichTextFieldType,
} from '@hubspot/cms-components/fields';
import CardStyle from '../../fieldLibrary/CardStyle/index.js';
import featuredImagePlaceholder from '../../../images/case-study-images/featured-image.jpg';

const textFeatureSet = [
  'block',
  'alignment',
  'indents',
  'lists',
  'standard_emphasis',
  'advanced_emphasis',
  'link',
  'personalize',
  'nonbreaking_space',
  'source_code',
  'visual_blocks',
] as RichTextFieldType['enabledFeatures'];

const linkFieldVisibility: AdvancedVisibility = {
  boolean_operator: 'AND',
  criteria: [
    {
      controlling_field_path: 'group_link.showWebsiteLink',
      controlling_value_regex: 'true',
      operator: 'EQUAL',
    },
  ],
};

export const fields = (
  <ModuleFields>
    <FieldGroup label="Featured image" name="group_logo" display="inline">
      <ImageField
        label="Image"
        name="customerLogo"
        resizable={true}
        responsive={true}
        showLoading={true}
        default={{
          alt: 'placeholder for a featured image',
          loading: 'lazy',
          src: featuredImagePlaceholder,
        }}
        inlineEditable={true}
      />
    </FieldGroup>
    <FieldGroup label="At a glance" name="group_summary" display="inline">
      <TextField label="Industry label" name="industryLabel" default="Industry" />
      <TextField label="Industry" name="industry" default="Technology" />
      <TextField label="Challenge label" name="challengeLabel" default="Challenge" />
      <RichTextField
        label="Challenge"
        name="challengeRichText"
        enabledFeatures={textFeatureSet}
        default="<p>The problem your customer faced. This content should be short and skimmable. Two to three sentences are a good standard for the right amount of content.</p>"
        inlineEditable={true}
      />
      <TextField label="Results label" name="resultsLabel" default="Results" />
      <RichTextField
        label="Results"
        name="resultsRichText"
        enabledFeatures={textFeatureSet}
        default="<p>The impact your customer saw. Two to three sentences are a good standard for the right amount of content.</p>"
        inlineEditable={true}
      />
      <TextField label="Key product label" name="keyProductLabel" default="Key product" />
      <TextField label="Key product" name="keyProduct" default="Product one" />
    </FieldGroup>
    <FieldGroup label="Customer website" name="group_link" display="inline">
      <BooleanField label="Show website link" name="showWebsiteLink" display="toggle" default={true} />
      <TextField label="Link text" name="linkText" default="www.customer.com" visibilityRules="ADVANCED" advancedVisibility={linkFieldVisibility} />
      <LinkField
        label="Link"
        name="websiteUrl"
        visibilityRules="ADVANCED"
        advancedVisibility={linkFieldVisibility}
        supportedTypes={['EXTERNAL', 'CONTENT', 'FILE', 'EMAIL_ADDRESS', 'BLOG']}
        default={{
          open_in_new_tab: true,
          url: {
            type: 'EXTERNAL',
            href: 'https://www.customer.com/',
            content_id: null,
          },
        }}
      />
    </FieldGroup>
    <FieldGroup label="Styles" name="group_style" tab="STYLE">
      <CardStyle cardStyleDefault="card_variant_2" />
    </FieldGroup>
  </ModuleFields>
);

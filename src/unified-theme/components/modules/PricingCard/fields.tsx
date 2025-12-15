import { ModuleFields, RepeatedFieldGroup, TextField, FieldGroup, BooleanField, AdvancedVisibility } from '@hubspot/cms-components/fields';
import { ButtonContent, HeadingAndText } from '../../fieldLibrary/index.js';
import StyleFields from './styleFields.js';

const buttonFieldVisibility: AdvancedVisibility = {
  boolean_operator: 'OR',
  criteria: [
    {
      controlling_field_path: 'groupPricingCards.groupButton.showButton',
      controlling_value_regex: 'true',
      operator: 'EQUAL',
    },
  ],
} as const;

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      label="Pricing cards"
      name="groupPricingCards"
      occurrence={{
        min: 1,
        max: 4,
        default: 1,
      }}
      default={[
        {
          groupSummary: {
            headingAndTextHeadingLevel: 'h2',
            headingAndTextHeading: 'Starter',
            description: 'Perfect for small businesses or startups looking to kickstart their digital marketing efforts',
            price: '$79',
            timePeriod: '/month',
          },
          groupPlanFeatures: {
            headingAndTextHeadingLevel: 'h3',
            headingAndTextHeading: 'Starter plan includes',
            groupFeatures: [
              { feature: 'Social media management' },
              { feature: 'Email marketing campaigns' },
              { feature: 'Basic SEO optimization' },
              { feature: 'Monthly performance reports' },
            ],
          },
          groupButton: {
            showButton: true,
            buttonContentText: 'Get started',
            buttonContentLink: { open_in_new_tab: true },
            buttonContentShowIcon: false,
            buttonContentIcon: { name: 'dollar-sign' },
            buttonContentIconPosition: 'right',
          },
        },
        {
          groupSummary: {
            headingAndTextHeadingLevel: 'h2',
            headingAndTextHeading: 'Pro',
            description: 'Ideal for growing businesses that want to expand their online presence and reach a larger audience',
            price: '$129',
            timePeriod: '/month',
          },
          groupPlanFeatures: {
            headingAndTextHeadingLevel: 'h3',
            headingAndTextHeading: 'Pro plan includes',
            groupFeatures: [
              { feature: 'Everything in Starter plan' },
              { feature: 'Advanced social media management' },
              { feature: 'Email marketing automation' },
              { feature: 'Basic SEO optimization' },
              { feature: 'Comprehensive SEO analysis and recommendations' },
            ],
          },
          groupButton: {
            showButton: true,
            buttonContentText: 'Get started',
            buttonContentLink: { open_in_new_tab: true },
            buttonContentShowIcon: false,
            buttonContentIcon: { name: 'dollar-sign' },
            buttonContentIconPosition: 'right',
          },
        },
        {
          groupSummary: {
            headingAndTextHeadingLevel: 'h2',
            headingAndTextHeading: 'Enterprise',
            description: 'Tailored for established businesses seeking a holistic digital marketing solution to boost brand visibility and engagement',
            price: '$599',
            timePeriod: '/month',
          },
          groupPlanFeatures: {
            headingAndTextHeadingLevel: 'h3',
            headingAndTextHeading: 'Enterprise plan includes',
            groupFeatures: [
              { feature: 'Everything in Pro plan' },
              { feature: 'Customized social media strategies' },
              { feature: 'Personalized email marketing campaigns' },
              { feature: 'Advanced SEO implementation and monitoring' },
              { feature: 'Bi-weekly performance reports and strategy consultations' },
            ],
          },
          groupButton: {
            showButton: true,
            buttonContentText: 'Contact sales',
            buttonContentLink: { open_in_new_tab: true },
            buttonContentShowIcon: false,
            buttonContentIcon: { name: 'dollar-sign' },
            buttonContentIconPosition: 'right',
          },
        },
      ]}
    >
      <FieldGroup label="Pricing summary" name="groupSummary" display="inline">
        <HeadingAndText headingTextLabel="Pricing plan title" headingLevelDefault="h2" textDefault="Starter" />
        <TextField
          label="Description"
          name="description"
          default="Perfect for small businesses or startups looking to kickstart their digital marketing efforts"
          inlineEditable={true}
        />
        <TextField label="Price" name="price" required={true} default="$79" inlineEditable={true} />
        <TextField label="Time period" name="timePeriod" required={true} default="/month" inlineEditable={true} />
      </FieldGroup>
      <FieldGroup label="Pricing plan features" name="groupPlanFeatures" display="inline">
        <HeadingAndText headingTextLabel="Features title" headingLevelDefault="h3" textDefault="Starter plan includes" />
        <RepeatedFieldGroup
          label="Features"
          name="groupFeatures"
          occurrence={{
            min: 1,
            max: 20,
            default: 5,
          }}
          default={[
            { feature: 'Social media management' },
            { feature: 'Email marketing campaigns' },
            { feature: 'Basic SEO optimization' },
            { feature: 'Monthly performance reports' },
          ]}
        >
          <TextField label="Feature" name="feature" default="Social media management" inlineEditable={true} />
        </RepeatedFieldGroup>
      </FieldGroup>
      <FieldGroup label="Button" name="groupButton" display="inline">
        <BooleanField label="Show button" name="showButton" display="toggle" default={true} />
        <ButtonContent
          textDefault="Get started"
          linkDefault={{ open_in_new_tab: true }}
          textVisibility={buttonFieldVisibility}
          linkVisibility={buttonFieldVisibility}
          showIconVisibility={buttonFieldVisibility}
        />
      </FieldGroup>
    </RepeatedFieldGroup>
    <StyleFields />
  </ModuleFields>
);

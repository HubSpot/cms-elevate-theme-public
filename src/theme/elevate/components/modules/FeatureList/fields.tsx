import {
  ModuleFields,
  NumberField,
  RepeatedFieldGroup,
  BooleanField,
  IconField,
  TextField,
  FieldGroup,
} from '@hubspot/cms-components/fields';
import {
  HeadingAndText,
  HeadingStyle,
  SectionStyle,
} from '../../fieldLibrary/index.js';

const headingLevelDefault = 'h3';
const contentDefault = 'Write a brief description of the product\'s capabilities';

export const fields = (
  <ModuleFields>
    <NumberField
      label='Number of items per row'
      name='columns'
      display='text'
      required={true}
      max={3}
      min={1}
      step={1}
      default={2}
    />
    <RepeatedFieldGroup
      label='Features'
      name='groupFeatures'
      id='groupFeatures'
      occurrence={{
        min: 1,
        max: 20,
        sorting_label_field: 'groupFeatures.groupFeatureContent',
        default: 8,
      }}
      default={[
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'file-pen',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'Content creation',
            featureDescription: contentDefault,
          },
        },
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'chart-simple',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'Analytics and reporting',
            featureDescription: contentDefault,
          },
        },
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'message',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'Messaging',
            featureDescription: contentDefault,
          },
        },
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'puzzle-piece',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'Integrations',
            featureDescription: contentDefault,
          },
        },
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'wand-magic-sparkles',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'Automation and workflows',
            featureDescription: contentDefault,
          },
        },
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'calendar-days',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'Campaign scheduling',
            featureDescription: contentDefault,
          },
        },
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'robot',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'AI Agents',
            featureDescription: contentDefault,
          },
        },
        {
          groupIcon: {
            showIcon: true,
            icon: {
              name: 'share-nodes',
            },
          },
          groupFeatureContent: {
            headingAndTextHeadingLevel: headingLevelDefault,
            headingAndTextHeading: 'Cross channel distribution',
            featureDescription: contentDefault,
          },
        },
      ]}
    >
      <FieldGroup
        label='Icon'
        name='groupIcon'
        display='inline'
      >
        <BooleanField
          label='Show icon'
          name='showIcon'
          display='toggle'
          default={true}
        />
        <IconField
          label='Icon'
          name='icon'
          iconSet='fontawesome-6.4.2'
          visibility={{
            controlling_field_path: 'groupFeatures.groupIcon.showIcon',
            controlling_value_regex: 'true',
            operator: 'EQUAL',
          }}
          default={{
            name: 'file-pen',
          }}
        />
      </FieldGroup>
      <FieldGroup
        label='Feature content'
        name='groupFeatureContent'
        id='groupFeatureContent'
        display='inline'
      >
        <HeadingAndText
          headingTextLabel='Feature name'
          headingLevelDefault={headingLevelDefault}
          textDefault='Content Creation'
        />
        <TextField
          label='Feature description'
          name='featureDescription'
          default={contentDefault}
          inlineEditable={true}
        />
      </FieldGroup>
    </RepeatedFieldGroup>
    <FieldGroup
      label='Styles'
      name='groupStyle'
      tab='STYLE'
    >
      <SectionStyle sectionStyleDefault='section_variant_1' />
      <HeadingStyle headingStyleAsDefault='h5' />
    </FieldGroup>
  </ModuleFields>
);

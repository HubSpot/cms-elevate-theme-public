import { ModuleFields, TextField, RepeatedFieldGroup, FieldGroup } from '@hubspot/cms-components/fields';
import { SectionStyle, HeadingStyle } from '../../fieldLibrary/index.js';

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      label="Metrics"
      name="groupMetrics"
      occurrence={{
        min: 1,
        max: 4,
        default: 1,
      }}
      default={[
        {
          metric: '15k+',
          description: 'Customers of Elevate',
        },
        {
          metric: '15k+',
          description: 'Customers of Elevate',
        },
        {
          metric: '15k+',
          description: 'Customers of Elevate',
        },
      ]}
    >
      <TextField label="Metric value" name="metric" default="15k+" inlineEditable={true} />
      <TextField label="Description" name="description" default="Customers of Elevate" inlineEditable={true} />
    </RepeatedFieldGroup>
    <FieldGroup label="Styles" name="groupStyle" tab="STYLE">
      <SectionStyle sectionStyleDefault="section_variant_1" />
      <HeadingStyle headingStyleAsDefault="display_1" />
    </FieldGroup>
  </ModuleFields>
);

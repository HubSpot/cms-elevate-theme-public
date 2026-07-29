import {
  ModuleFields,
  FieldGroup,
} from '@hubspot/cms-components/fields';
import  {
  RichTextContent,
  SectionStyle,
} from '../../fieldLibrary/index.js';

export const fields = (
  <ModuleFields>
    <RichTextContent featureSet='extended' />
    <FieldGroup
      label='Styles'
      name='groupStyle'
      tab='STYLE'
    >
      <SectionStyle sectionStyleDefault='section_variant_1' />
    </FieldGroup>
  </ModuleFields>
);

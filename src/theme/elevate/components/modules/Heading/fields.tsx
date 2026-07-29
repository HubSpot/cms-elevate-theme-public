import {
  ModuleFields,
  FieldGroup,
  TextAlignmentField
} from '@hubspot/cms-components/fields';
import  {
  HeadingAndText,
  HeadingStyle,
  SectionStyle,
} from '../../fieldLibrary/index.js';

export const fields = (
  <ModuleFields>
    <HeadingAndText
      headingLevelDefault="h1"
      textDefault="A clear and bold heading"
    />
    <FieldGroup
      label="Styles"
      name="groupStyle"
      tab="STYLE"
    >
      <SectionStyle sectionStyleDefault='section_variant_1' />
      <HeadingStyle headingStyleAsDefault="h1" />
      <TextAlignmentField
        label="Alignment"
        name="alignment"
        default={{
          "text_align": "LEFT"
        }}
      />
    </FieldGroup>
  </ModuleFields>
);

import {
  ChoiceField,
  AdvancedVisibility,
} from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';

type SectionStyle = {
  sectionStyleDefault: SectionVariantType;
  sectionStyleVisibility?: AdvancedVisibility;
};

export default function SectionStyle(props: SectionStyle) {
  const {
    sectionStyleDefault = 'section_variant_1',
    sectionStyleVisibility = null,
  } = props;

  return (
    <ChoiceField
      label='Text color'
      name='sectionStyleVariant'
      visibilityRules='ADVANCED'
      advancedVisibility={sectionStyleVisibility}
      display='select'
      choices={[
        ['section_variant_1', 'Light section 1 text color'],
        ['section_variant_2', 'Light section 2 text color'],
        ['section_variant_3', 'Light section 3 text color'],
        ['section_variant_4', 'Dark section text color'],
      ]}
      inlineHelpText='<a href="$theme_link">Edit</a>'
      links={[
        {
          type: 'THEME_EDITOR',
          name: 'theme_link',
          params: {
            theme_path: '@hubspot/elevate',
            theme_field_path: 'group_foundation.group_colors.group_more_settings.group_sections.group_light_section_1'
          }
        }
      ]}
      required={true}
      default={sectionStyleDefault}
    />
  );
}

import { ChoiceField, AdvancedVisibility } from '@hubspot/cms-components/fields';
import { HeadingStyleVariant } from './types.js';

type HeadingStyles = {
  headingStyleAsDefault: HeadingStyleVariant;
  headingStyleAsVisibility?: AdvancedVisibility;
  headingStyleAsLabel?: string;
};

export default function HeadingStyles(props: HeadingStyles) {
  const { headingStyleAsDefault = 'h1', headingStyleAsVisibility = null, headingStyleAsLabel = 'Heading style' } = props;

  return (
    <ChoiceField
      label={headingStyleAsLabel}
      name="headingStyleVariant"
      visibilityRules="ADVANCED"
      advancedVisibility={headingStyleAsVisibility}
      choices={[
        ['display_1', 'Display 1'],
        ['display_2', 'Display 2'],
        ['h1', 'Heading 1'],
        ['h2', 'Heading 2'],
        ['h3', 'Heading 3'],
        ['h4', 'Heading 4'],
        ['h5', 'Heading 5'],
        ['h6', 'Heading 6'],
      ]}
      inlineHelpText='<a href="$theme_link">Edit</a>'
      links={[
        {
          type: 'THEME_EDITOR',
          name: 'theme_link',
          params: {
            theme_path: '@hubspot/elevate',
            theme_field_path: 'group_foundation.group_fonts.group_font_elements.group_headings.group_heading_1'
          }
        }
      ]}
      required={true}
      default={headingStyleAsDefault}
    />
  );
}

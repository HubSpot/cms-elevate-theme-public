import {
  ChoiceField,
  AdvancedVisibility,
} from '@hubspot/cms-components/fields';
import { LinkStyleType } from '../../types/fields.js';

type LinkStyle = {
  linkStyleDefault: LinkStyleType;
  linkStyleVisibility?: AdvancedVisibility;
};

export default function LinkStyle(props: LinkStyle) {
  const {
    linkStyleDefault = 'primary_links',
    linkStyleVisibility = null,
  } = props;

  return (
    <ChoiceField
      label='Link style'
      name='linkStyleVariant'
      visibilityRules='ADVANCED'
      advancedVisibility={linkStyleVisibility}
      display='select'
      choices={[
        ['primary_links', 'Primary'],
        ['secondary_links', 'Secondary']
      ]}
      inlineHelpText='<a href="$theme_link">Edit</a>'
      links={[
        {
          type: 'THEME_EDITOR',
          name: 'theme_link',
          params: {
            theme_path: '@hubspot/elevate',
            theme_field_path: 'group_elements.group_links.group_primary_links'
          }
        }
      ]}
      required={true}
      default={linkStyleDefault}
    />
  );
}

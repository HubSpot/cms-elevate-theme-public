import {
  ChoiceField,
  AdvancedVisibility,
} from '@hubspot/cms-components/fields';
import { ButtonStyleType, StandardSizeType } from '../../types/fields.js';

type ButtonStyle = {
  buttonStyleDefault: ButtonStyleType;
  buttonStyleVisibility?: AdvancedVisibility;
  buttonSizeDefault: StandardSizeType;
  buttonSizeVisibility?: AdvancedVisibility;
};

export default function ButtonStyle(props: ButtonStyle) {
  const {
    buttonStyleDefault = 'primary',
    buttonStyleVisibility = null,
    buttonSizeDefault = 'medium',
    buttonSizeVisibility = null,
  } = props;

  return (
    <>
      <ChoiceField
        label='Button style'
        name='buttonStyleVariant'
        visibilityRules='ADVANCED'
        advancedVisibility={buttonStyleVisibility}
        display='select'
        choices={[
          ['primary', 'Primary'],
          ['secondary', 'Secondary'],
          ['tertiary', 'Tertiary'],
          ['accent', 'Accent'],
        ]}
        inlineHelpText='<a href="$theme_link">Edit</a>'
        links={[
          {
            type: 'THEME_EDITOR',
            name: 'theme_link',
            params: {
              theme_path: '@hubspot/elevate',
              theme_field_path: 'group_elements.group_button_types.group_primary_button'
            }
          }
        ]}
        required={true}
        default={buttonStyleDefault}
      />
      <ChoiceField
        label='Button size'
        name='buttonStyleSize'
        visibilityRules='ADVANCED'
        advancedVisibility={buttonSizeVisibility}
        display='select'
        choices={[
          ['small', 'Small'],
          ['medium', 'Medium'],
          ['large', 'Large'],
        ]}
        inlineHelpText='<a href="$theme_link">Edit</a>'
        links={[
          {
            type: 'THEME_EDITOR',
            name: 'theme_link',
            params: {
              theme_path: '@hubspot/elevate',
              theme_field_path: 'group_elements.group_button_types.group_primary_button'
            }
          }
        ]}
        required={true}
        default={buttonSizeDefault}
      />
    </>
  );
}

import { FieldGroup, ChoiceField, AlignmentField } from '@hubspot/cms-components/fields';
import { ButtonStyle } from '../../fieldLibrary/index.js';

export default function StyleFields() {
  return (
    <FieldGroup label="Styles" name="groupStyle" tab="STYLE">
      <ChoiceField
        label="Shape"
        name="shape"
        choices={[
          ['square', 'Square'],
          ['rounded', 'Rounded'],
          ['circle', 'Circle'],
        ]}
        display="buttons"
        preset="social_icon_background_shape"
        required={true}
        default="circle"
      />
      <ButtonStyle buttonStyleDefault="primary" buttonSizeDefault="medium" />
      <ChoiceField
        label="Gap"
        name="spaceBetweenIcons"
        choices={[
          ['small', 'Small'],
          ['medium', 'Medium'],
          ['large', 'Large'],
        ]}
        required={true}
        default="medium"
      />
      <AlignmentField label="Alignment" name="alignment" alignmentDirection="HORIZONTAL" default={{ horizontal_align: 'CENTER' }} />
    </FieldGroup>
  );
}

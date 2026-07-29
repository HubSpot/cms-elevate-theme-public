import {
  FieldGroup,
  ChoiceField,
  AlignmentField,
} from '@hubspot/cms-components/fields';
import  {
  CardStyle,
  HeadingStyle,
  ButtonStyle
} from '../../fieldLibrary/index.js';

export default function StyleFields() {
  return (
    <FieldGroup
      label='Styles'
      name='groupStyle'
      tab='STYLE'
    >
      <FieldGroup
        label='Card'
        name='groupCard'
        display='inline'
      >
        <ChoiceField
          label='Card orientation'
          name='cardOrientation'
          choices={[
            ['column', 'Column'],
            ['row', 'Row'],
          ]}
          display='radio'
          default='column'
        />
        <CardStyle cardStyleDefault='card_variant_1' />
      </FieldGroup>
      <FieldGroup
        label='Content'
        name='groupContent'
        display='inline'
      >
        <HeadingStyle headingStyleAsDefault='h3' />
        <AlignmentField
          label='Horizontal alignment'
          name='alignment'
          alignmentDirection='HORIZONTAL'
          default={{
            horizontal_align: 'LEFT',
          }}
        />
      </FieldGroup>
      <FieldGroup
        label='Button'
        name='groupButton'
        display='inline'
      >
        <ButtonStyle
          buttonStyleDefault='primary'
          buttonSizeDefault='medium'
        />
      </FieldGroup>
    </FieldGroup>
  );
}

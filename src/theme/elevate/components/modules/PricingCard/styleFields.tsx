import { FieldGroup } from '@hubspot/cms-components/fields';
import { ButtonStyle, HeadingStyle, CardStyle } from '../../fieldLibrary/index.js';

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
        <CardStyle cardStyleDefault='card_variant_1' />
      </FieldGroup>
      <FieldGroup
        label='Pricing summary'
        name='groupSummary'
        display='inline'
      >
        <HeadingStyle headingStyleAsDefault='h2' />
      </FieldGroup>
      <FieldGroup
        label='Pricing plan features'
        name='groupPlanFeatures'
        display='inline'
      >
        <HeadingStyle headingStyleAsDefault='h3' />
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

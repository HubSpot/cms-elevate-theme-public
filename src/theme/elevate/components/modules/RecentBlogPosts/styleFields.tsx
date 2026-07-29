import { FieldGroup } from '@hubspot/cms-components/fields';
import CardStyle from '../../fieldLibrary/CardStyle/index.js';
import HeadingStyles from '../../fieldLibrary/HeadingStyle/index.js';

const StyleFields = () => (
  <FieldGroup name="groupStyle" label="Styles" tab="STYLE">
    <CardStyle cardStyleDefault="card_variant_1" />
    <HeadingStyles headingStyleAsDefault="h3" />
  </FieldGroup>
);

export default StyleFields;

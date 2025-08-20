import { TextField, ChoiceField } from '@hubspot/cms-components/fields';
import { buttonVariantSystem } from './config.js';

export default function ButtonContentFields() {
  const variantChoices = buttonVariantSystem.getChoicesFor('variant');
  const sizeChoices = buttonVariantSystem.getChoicesFor('size');

  return (
    <>
      <TextField
        label="Button Text"
        name="text"
        default="ITS ME THE BUTTON"
        helpText="The text displayed on the button"
      />
      <ChoiceField
        label="Button Variant"
        name="variant"
        default="primary"
        choices={variantChoices}
        helpText="Visual style variant of the button"
      />
      <ChoiceField
        label="Button Size"
        name="size"
        default="medium"
        choices={sizeChoices}
        helpText="Size of the button"
      />
    </>
  );
}

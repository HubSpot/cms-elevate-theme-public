import {
  ModuleFields,
  RepeatedFieldGroup,
  TextField,
  FieldGroup,
  ChoiceField,
} from '@hubspot/cms-components/fields';
import {
  CardStyle,
  RichTextContent,
} from '../../fieldLibrary/index.js';

const defaultAccordion = {
  title: 'Here is where the accordion title goes',
  richTextContentHTML: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor arcu non commodo elementum.</p>',
};

export const fields = (
  <ModuleFields>
    <ChoiceField
      label='Icon'
      name='icon'
      display='buttons'
      choices={[['chevron', 'chevron'], ['plus', 'plus']]}
      preset='expand_icon'
      required={true}
      default='chevron'
    />
    <RepeatedFieldGroup
      label='Accordions'
      name='groupAccordions'
      occurrence={{
        min: 1,
        max: 20,
        default: 3,
      }}
      default={[
        defaultAccordion,
        defaultAccordion,
        defaultAccordion,
      ]}
    >
      <TextField
        label='Title'
        name='title'
        default='Here is where the accordion title goes'
        inlineEditable={true}
      />
      <RichTextContent
        label='Description'
        richTextDefault='<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor arcu non commodo elementum.</p>'
        featureSet='text'
      />
    </RepeatedFieldGroup>
    <FieldGroup
      label='Styles'
      name='groupStyle'
      tab='STYLE'
    >
      <CardStyle cardStyleDefault='card_variant_2' />
      <ChoiceField
        label='Gap'
        name='gap'
        helpText='The space between the accordions'
        display='select'
        choices={[
          ['small', 'Small'],
          ['medium', 'Medium'],
          ['large', 'Large'],
        ]}
        required={true}
        default='medium'
      />
    </FieldGroup>
  </ModuleFields>
);

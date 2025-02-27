import { ModuleFields, ChoiceField, FieldGroup, BooleanField, TextField } from '@hubspot/cms-components/fields';
import HeadingStyle from '../../fieldLibrary/HeadingStyle/index.js';
import HeadingAndText from '../../fieldLibrary/HeadingAndText/index.js';
import { CardStyle } from '../../fieldLibrary/index.js';

export const fields = (
  <ModuleFields>
    <ChoiceField
      label="Card elements to display"
      name="displayForEachListItem"
      display="checkbox"
      multiple={true}
      reorderingEnabled={false}
      choices={[['tags', 'Tags']]}
      default={['tags']}
    />
    <HeadingAndText
      headingLevelDefault="h2"
      headingLevelLabel="Post title heading level"
      textVisibility={{
        boolean_operator: 'AND',
        criteria: [
          {
            operator: 'EQUAL',
            controlling_field_path: 'defaultRules.lockHeadingTextField',
            controlling_value_regex: 'false',
          },
        ],
      }}
    />
    <FieldGroup name="defaultRules" label="Default Rules" locked={true}>
      <BooleanField name="lockHeadingTextField" label="Lock heading text field" default={true} locked={true} />
    </FieldGroup>

    <FieldGroup name="defaultContent" label="Default content" locked={true}>
      <TextField name="nextPage" label="Next page" default="Next page" locked={true} />
      <TextField name="previousPage" label="Previous page" default="Previous page" locked={true} />
    </FieldGroup>

    <FieldGroup name="groupStyle" label="Style" tab="STYLE">
      <CardStyle cardStyleDefault="card_variant_2" />
      <HeadingStyle headingStyleAsDefault="h4" headingStyleAsLabel="Post title heading style" />
    </FieldGroup>
  </ModuleFields>
);

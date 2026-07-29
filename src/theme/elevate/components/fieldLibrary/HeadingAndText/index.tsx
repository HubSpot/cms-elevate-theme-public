import { TextField, ChoiceField, AdvancedVisibility } from '@hubspot/cms-components/fields';
import { HeadingLevelType } from '../../types/fields.js';

type HeadingAndTextProps = {
  headingLevelDefault?: HeadingLevelType;
  headingTextLabel?: string;
  headingLevelLabel?: string;
  textDefault?: string;
  headingLevelVisibility?: AdvancedVisibility;
  textVisibility?: AdvancedVisibility;
};

export default function HeadingAndText(props: HeadingAndTextProps) {
  const {
    headingLevelDefault = 'h3',
    headingTextLabel = 'Heading text',
    headingLevelLabel = 'Semantic heading level',
    textDefault = 'Lorem Heading',
    headingLevelVisibility = null,
    textVisibility = null,
  } = props;
  const headingChoices: [any, string][] = [
    ['h1', 'Heading 1'],
    ['h2', 'Heading 2'],
    ['h3', 'Heading 3'],
    ['h4', 'Heading 4'],
    ['h5', 'Heading 5'],
    ['h6', 'Heading 6'],
  ];

  return (
    <>
      <TextField
        label={headingTextLabel}
        name="headingAndTextHeading"
        visibilityRules="ADVANCED"
        advancedVisibility={textVisibility}
        default={textDefault}
        inlineEditable={true}
      />
      <ChoiceField
        label={headingLevelLabel}
        name="headingAndTextHeadingLevel"
        helpText="This affects screen readers and how search engines understand your content, not how it looks. To change the visual style, use <b>Heading style</b> in the Styles tab."
        visibilityRules="ADVANCED"
        advancedVisibility={headingLevelVisibility}
        display="select"
        choices={headingChoices}
        required={true}
        default={headingLevelDefault}
      />
    </>
  );
}

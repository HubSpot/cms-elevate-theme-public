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
    headingLevelLabel = 'Heading level',
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
      <TextField label={headingTextLabel} name="headingAndTextHeading" visibilityRules="ADVANCED" advancedVisibility={textVisibility} default={textDefault} />
      <ChoiceField
        label={headingLevelLabel}
        name="headingAndTextHeadingLevel"
        helpText="Choose a heading level. Headings should be nested in a hierarchical way based on your content. <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'>More information</a>"
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

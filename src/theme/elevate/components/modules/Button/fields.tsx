import {
  ModuleFields,
  RepeatedFieldGroup,
  TextField,
  FieldGroup,
  AlignmentField,
  ChoiceField,
} from '@hubspot/cms-components/fields';
import { ButtonContent, ButtonStyle } from '../../fieldLibrary/index.js';

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      label='Buttons'
      name='groupButtons'
      occurrence={{
        min: 1,
        max: 2,
        default: 1,
      }}
      default={[
        {
          buttonContentText: 'Learn more',
          buttonContentLink: {
            open_in_new_tab: true,
          },
          buttonContentShowIcon: false,
          buttonContentIcon: {
            name: 'arrow-right',
          },
          buttonContentIconPosition: 'right',
        },
      ]}
    >
      <ButtonContent
        textDefault='Learn more'
        linkDefault={{
          open_in_new_tab: true,
        }}
        iconPositionDefault='left'
      />
    </RepeatedFieldGroup>
    <FieldGroup
      label='Styles'
      name='groupStyle'
      tab='STYLE'
    >
      <ButtonStyle
        buttonStyleDefault='primary'
        buttonSizeDefault='medium'
      />
      <ChoiceField
        label='Gap'
        name='gap'
        helpText='The horizontal space between buttons'
        display='select'
        choices={[
          ['small', 'Small'],
          ['medium', 'Medium'],
          ['large', 'Large'],
        ]}
        required={true}
        default='medium'
      />
      <AlignmentField
        label='Alignment'
        name='alignment'
        alignmentDirection='HORIZONTAL'
        default={{
          horizontal_align: 'LEFT',
        }}
      />
    </FieldGroup>
    <FieldGroup
      label='Accessibility'
      name='groupAriaLabels'
      locked={true}
    >
      <TextField
        label='Aria label for external link'
        name='ariaLabel_external'
        default='Open external link'
      />
      <TextField
        label='Aria label for content link'
        name='ariaLabel_content'
        default='Open content link'
      />
      <TextField
        label='Aria label for file link'
        name='ariaLabel_file'
        default='Open file link'
      />
      <TextField
        label='Aria label for email link'
        name='ariaLabel_email'
        default='Open email link'
      />
      <TextField
        label='Aria label for blog link'
        name='ariaLabel_blog'
        default='Open blog link'
      />
      <TextField
        label='Aria label for payment link'
        name='ariaLabel_payment'
        default='Open payment link'
      />
      <TextField
        label='Default aria label'
        name='ariaLabel_default'
        default='Link not set, button inactive'
      />
    </FieldGroup>
  </ModuleFields>
);

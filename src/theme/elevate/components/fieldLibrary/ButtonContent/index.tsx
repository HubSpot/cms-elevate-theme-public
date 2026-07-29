import {
  TextField,
  LinkField,
  IconField,
  ChoiceField,
  AdvancedVisibility,
  BooleanField,
} from '@hubspot/cms-components/fields';
import {
  IconFieldType,
  LinkFieldType,
  TextFieldType,
} from '@hubspot/cms-components/fields';

type ButtonContentProps = {
  textDefault: TextFieldType['default'];
  linkDefault?: LinkFieldType['default'];
  iconDefault?: IconFieldType['default'];
  iconPositionDefault?: 'left' | 'right';
  textVisibility?: AdvancedVisibility;
  linkVisibility?: AdvancedVisibility;
  showIconVisibility?: AdvancedVisibility;
};

export default function ButtonContent(props: ButtonContentProps) {
  const {
    textDefault = 'Learn more',
    linkDefault = {
      open_in_new_tab: true
    },
    iconDefault = {
      name: 'arrow-right'
    },
    iconPositionDefault = 'right',
    textVisibility = null,
    linkVisibility = null,
    showIconVisibility = null,
  } = props;

  const iconVisibility: AdvancedVisibility = {
    boolean_operator: 'AND',
    criteria: [
      {
        controlling_field: 'buttonContentShowIcon',
        controlling_value_regex: 'true',
        operator: 'EQUAL',
      },
    ],
    children: showIconVisibility ? [showIconVisibility] : [],
  } as const;

  return (
    <>
      <TextField
        label='Button text'
        name='buttonContentText'
        visibilityRules='ADVANCED'
        advancedVisibility={textVisibility}
        required
        default={textDefault}
        inlineEditable={true}
      />
      <LinkField
        label='Link'
        name='buttonContentLink'
        visibilityRules='ADVANCED'
        advancedVisibility={linkVisibility}
        supportedTypes={[
          'EXTERNAL',
          'CONTENT',
          'FILE',
          'EMAIL_ADDRESS',
          'CALL_TO_ACTION',
          'BLOG',
          'PAYMENT',
        ]}
        default={linkDefault}
      />
      <BooleanField
        label='Show icon'
        name='buttonContentShowIcon'
        id='buttonContentShowIcon'
        visibilityRules='ADVANCED'
        advancedVisibility={showIconVisibility}
        display='toggle'
        default={false}
      />
      <IconField
        label='Icon'
        name='buttonContentIcon'
        id='buttonContentIcon'
        visibilityRules='ADVANCED'
        advancedVisibility={iconVisibility}
        iconSet='fontawesome-6.4.2'
        default={iconDefault}
      />
      <ChoiceField
        label='Icon position'
        name='buttonContentIconPosition'
        visibilityRules='ADVANCED'
        advancedVisibility={iconVisibility}
        choices={[
          ['left', 'Left'],
          ['right', 'Right'],
        ]}
        display='select'
        default={iconPositionDefault}
      />
    </>
  );
}

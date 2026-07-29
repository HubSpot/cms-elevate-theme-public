import {
  ModuleFields,
  ImageField,
  ChoiceField,
  BooleanField,
  FieldGroup,
  AlignmentField,
  AdvancedVisibility,
} from '@hubspot/cms-components/fields';
import {
  ButtonContent,
  ButtonStyle,
  HeadingAndText,
  HeadingStyle,
  RichTextContent,
  SectionStyle,
} from '../../fieldLibrary/index.js';
import engagementImage from './assets/engagement.png';

const buttonFieldVisibility: AdvancedVisibility = {
  boolean_operator: 'OR',
  criteria: [{
    controlling_field_path: 'groupButton.showButton',
    controlling_value_regex: 'true',
    operator: 'EQUAL',
  }]
} as const;

export const fields = (
  <ModuleFields>
    <FieldGroup
      label='Image'
      name='groupImage'
      display='inline'
    >
      <ImageField
        label='Image'
        name='image'
        resizable={false}
        responsive={false}
        showLoading={true}
        default={{
          alt: '',
          loading: 'lazy',
          src: engagementImage,
        }}
        inlineEditable={true}
      />
      <ChoiceField
        label='Image position'
        name='imagePosition'
        visibility={{
          controlling_field_path: 'groupImage.image',
          property: 'src',
          operator: 'NOT_EMPTY',
        }}
        display='radio'
        choices={[
          ['left', 'Left'],
          ['right', 'Right'],
        ]}
        required={true}
        default='left'
      />
    </FieldGroup>
    <FieldGroup
      label='Content'
      name='groupContent'
      display='inline'
    >
      <HeadingAndText
        headingTextLabel='Title'
        headingLevelDefault='h2'
        textDefault='Increase reach and engagement'
      />
      <RichTextContent
        label='Description'
        richTextDefault='<p>Write a description highlighting the functionality, benefits, and uniqueness of your feature. A couple of sentences here is just right.</p>'
        featureSet='text'
      />
    </FieldGroup>
    <FieldGroup
      label='Button'
      name='groupButton'
      display='inline'
    >
      <BooleanField
        label='Show button'
        name='showButton'
        display='toggle'
        default={true}
      />
      <ButtonContent
        textDefault='Explore more'
        textVisibility={buttonFieldVisibility}
        linkVisibility={buttonFieldVisibility}
        showIconVisibility={buttonFieldVisibility}
      />
    </FieldGroup>
    <FieldGroup
      label='Styles'
      name='groupStyle'
      tab='STYLE'
    >
      <FieldGroup
        label='Content'
        name='groupContent'
        display='inline'
      >
        <SectionStyle sectionStyleDefault='section_variant_1' />
        <HeadingStyle headingStyleAsDefault='h3' />
        <AlignmentField
          label='Vertical alignment'
          name='verticalAlignment'
          alignmentDirection='VERTICAL'
          default={{
            vertical_align: 'MIDDLE',
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
          buttonSizeVisibility={buttonFieldVisibility}
          buttonStyleVisibility={buttonFieldVisibility}
        />
      </FieldGroup>
    </FieldGroup>
  </ModuleFields>
);

import {
  ModuleFields,
  RepeatedFieldGroup,
  IconField,
  ChoiceField,
  ImageField,
  BooleanField,
  FieldGroup,
  AdvancedVisibility
} from '@hubspot/cms-components/fields';
import {
  HeadingAndText,
  ButtonContent,
  RichTextContent,
} from '../../fieldLibrary/index.js';
import StyleFields from './styleFields.js';
import newsletterImage from './assets/newsletter.png';

const buttonFieldVisibility: AdvancedVisibility = {
  boolean_operator: 'OR',
  criteria: [{
    controlling_field_path: 'groupCards.groupButton.showButton',
    controlling_value_regex: 'true',
    operator: 'EQUAL',
  }]
} as const;

export const fields = (
  <ModuleFields>
    <ChoiceField
      label='Image or icon'
      name='imageOrIcon'
      choices={[
        ['image', 'Image'],
        ['icon', 'Icon'],
      ]}
      default='icon'
    />
    <RepeatedFieldGroup
      label='Cards'
      name='groupCards'
      id='groupCards'
      occurrence={{
        min: 1,
        max: 4,
        sorting_label_field: 'groupCards.groupContent',
        default: 1,
      }}
      default={[
        {
          groupIcon: {
            icon: {
              name: 'play-circle',
            },
          },
          groupImage: {
            image: {
              src: newsletterImage,
              alt: '',
              loading: 'lazy',
            },
          },
          groupContent: {
            headingAndTextHeadingLevel: 'h3',
            headingAndTextHeading: 'Content Creation',
            richTextContentHTML:
              "<p>Stand out with our captivating content creation services, tailored to engage today's digital audience </p>",
          },
          groupButton: {
            showButton: false,
            buttonContentText: 'Explore more',
            buttonContentLink: {
              open_in_new_tab: true,
            },
            buttonContentShowIcon: false,
            buttonContentIcon: {
              name: 'arrow-right',
            },
            buttonContentIconPosition: 'right',
          },
        },
      ]}
    >
      <FieldGroup label='Icon' name='groupIcon' display='inline'>
        <IconField
          label='Icon'
          name='icon'
          iconSet='fontawesome-6.4.2'
          visibility={{
            controlling_field: 'imageOrIcon',
            controlling_value_regex: 'icon',
            operator: 'EQUAL',
          }}
          default={{
            name: 'wrench',
          }}
        />
      </FieldGroup>
      <FieldGroup label='Image' name='groupImage' display='inline'>
        <ImageField
          label='Image'
          name='image'
          visibility={{
            controlling_field: 'imageOrIcon',
            controlling_value_regex: 'image',
            operator: 'EQUAL',
          }}
          resizable={false}
          responsive={false}
          showLoading={true}
          default={{
            alt: '',
            loading: 'lazy',
            src: newsletterImage,
          }}
        />
      </FieldGroup>
      <FieldGroup label='Content' name='groupContent' display='inline' id='groupContent'>
        <HeadingAndText headingTextLabel='Title' headingLevelDefault='h3' textDefault='Content Creation' />
        <RichTextContent
          label='Description'
          richTextDefault="<p>Stand out with our captivating content creation services, tailored to engage today's digital audience</p>"
          featureSet='text'
        />
      </FieldGroup>
      <FieldGroup label='Button' name='groupButton' display='inline'>
        <BooleanField label='Show button' name='showButton' display='toggle' default={false} />
        <ButtonContent
          textDefault='Explore more'
          linkDefault={{
            open_in_new_tab: true,
          }}
          textVisibility={buttonFieldVisibility}
          linkVisibility={buttonFieldVisibility}
          showIconVisibility={buttonFieldVisibility}
        />
      </FieldGroup>
    </RepeatedFieldGroup>
    <StyleFields />
  </ModuleFields>
);

import { ModuleFields, TextField, ChoiceField, IconField, FieldGroup } from '@hubspot/cms-components/fields';
import StyleFields from './styleFields.js';

export const fields = (
  <ModuleFields>
    <ChoiceField
      name='platforms'
      label='Included platforms'
      choices={[
        ['facebook', 'Facebook'],
        ['twitter', 'Twitter'],
        ['linkedin', 'LinkedIn'],
        ['pinterest', 'Pinterest'],
        ['email', 'Email'],
      ]}
      multiple={true}
      display='checkbox'
      default={['facebook', 'twitter', 'linkedin', 'pinterest', 'email']}
      reorderingEnabled={false}
    />
    <FieldGroup
      label='Default icons'
      name='groupDefaultIcons'
      locked={true}
    >
      <IconField
        label='Facebook Icon'
        name='facebook'
        iconSet='fontawesome-6.4.2'
        default={{
          name: 'Facebook F',
        }}
      />
      <IconField
        label='X Icon'
        name='twitter'
        iconSet='fontawesome-6.4.2'
        default={{
          name: 'X Twitter',
        }}
      />
      <IconField
        label='Email Icon'
        name='envelope'
        iconSet='fontawesome-6.4.2'
        default={{
          name: 'envelope',
        }}
      />
      <IconField
        label='LinkedIn Icon'
        name='linkedin'
        iconSet='fontawesome-6.4.2'
        default={{
          name: 'linkedin',
        }}
      />
      <IconField
        label='Pinterest Icon'
        name='pinterest'
        iconSet='fontawesome-6.4.2'
        default={{
          name: 'pinterest',
        }}
      />
    </FieldGroup>
    <FieldGroup
      label='Default text'
      name='groupDefaultText'
      locked={true}
    >
      <TextField
        label='X link aria label'
        name='twitterLinkAriaLabel'
        default='Share on X'
      />
      <TextField
        label='Facebook link aria label'
        name='facebookLinkAriaLabel'
        default='Share on Facebook'
      />
      <TextField
        label='LinkedIn link aria label'
        name='linkedinLinkAriaLabel'
        default='Share on LinkedIn'
      />
      <TextField
        label='Pinterest link aria label'
        name='pinterestLinkAriaLabel'
        default='Share on Pinterest'
      />
      <TextField
        label='Email link aria label'
        name='emailLinkAriaLabel'
        default='Share us via email'
      />
    </FieldGroup>
    <StyleFields />
  </ModuleFields>
);

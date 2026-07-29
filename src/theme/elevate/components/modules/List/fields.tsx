import { BooleanField, FieldGroup, IconField, ModuleFields, RepeatedFieldGroup, TextField } from '@hubspot/cms-components/fields';
import { SectionStyle } from '../../fieldLibrary/index.js';

const contentDefault = 'Add a list item here.';
const groupListContentDefault = {
  groupListContent: {
    listItemContent: contentDefault,
  },
};

export const fields = (
  <ModuleFields>
    <IconField
      label="Icon"
      name="listIcon"
      iconSet="fontawesome-6.4.2"
      default={{
        name: 'check',
      }}
    />

    <RepeatedFieldGroup
      label="List items"
      name="groupListItems"
      id="groupListItems"
      occurrence={{
        min: 1,
        max: 20,
        default: 4,
      }}
      default={[groupListContentDefault, groupListContentDefault, groupListContentDefault, groupListContentDefault]}
    >
      <FieldGroup label="List items" name="groupListContent" display="inline">
        <TextField label="Item" name="listItemContent" default={contentDefault} inlineEditable={true} />
      </FieldGroup>
    </RepeatedFieldGroup>

    <FieldGroup label="Styles" name="groupStyle" tab="STYLE">
      <SectionStyle sectionStyleDefault="section_variant_1" />
    </FieldGroup>
  </ModuleFields>
);

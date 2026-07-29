import { ModuleFields, BlogField, BooleanField, TagField, FieldGroup, TextField } from '@hubspot/cms-components/fields';
import StyleFields from './styleFields.js';
import { HeadingAndText } from '../../fieldLibrary/index.js';
import { AdvancedVisibility } from '@hubspot/cms-components/fields';

const textVisibility: AdvancedVisibility = {
  boolean_operator: 'AND',
  criteria: [
    {
      controlling_field_path: 'headingAndTextHeadingLevel',
      operator: 'EQUAL',
      controlling_value_regex: 'ThisFieldShouldAlwaysBeHidden',
    },
  ],
};

export const fields = (
  <ModuleFields>
    <BlogField label="Blog" name="blog" />
    <BooleanField label="Filter by tag" display="toggle" name="filterByTag" default={false} />
    <TagField
      label="Tag"
      name="tag"
      tagValue="SLUG"
      visibility={{
        controlling_field_path: 'filterByTag',
        controlling_value_regex: 'true',
        operator: 'EQUAL',
      }}
    />
    <HeadingAndText headingLevelDefault="h3" textVisibility={textVisibility} />
    <StyleFields />
    <FieldGroup label="Placeholder text" name="groupPlaceholderText" locked={true}>
      <TextField label="Title" name="placeholderTitle" default="No posts found" />
      <TextField label="Description" name="placeholderDescription" default="Select a blog in the sidebar" />
    </FieldGroup>
  </ModuleFields>
);

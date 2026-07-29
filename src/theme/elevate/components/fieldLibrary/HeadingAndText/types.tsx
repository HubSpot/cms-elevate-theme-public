import { TextFieldType } from '@hubspot/cms-components/fields';
import { HeadingLevelType } from '../../types/fields.js';

export type HeadingAndTextFieldLibraryType = {
  headingAndTextHeading: TextFieldType['default'];
  headingAndTextHeadingLevel: HeadingLevelType;
};

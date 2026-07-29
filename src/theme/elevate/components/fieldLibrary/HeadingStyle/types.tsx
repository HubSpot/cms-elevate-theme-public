import { HeadingLevelType } from '../../types/fields.js';

export type HeadingStyleVariant = HeadingLevelType | 'display_1' | 'display_2';
export type HeadingStyleFieldLibraryType = {
  headingStyleVariant: HeadingStyleVariant;
};

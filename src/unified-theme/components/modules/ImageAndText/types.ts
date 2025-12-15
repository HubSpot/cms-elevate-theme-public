import { ImageFieldType, BooleanFieldType, AlignmentFieldType } from '@hubspot/cms-components/fields';
import { ElementPositionType } from '../../types/fields.js';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';

// Image group types
export interface GroupImage {
  image?: ImageFieldType['default'];
  imagePosition: ElementPositionType;
}

// Button group types
export interface GroupButton extends ButtonContentType {
  showButton: BooleanFieldType['default'];
}

export type GroupButtonStyle = ButtonStyleFieldLibraryType;

// Content group types
export type GroupContent = RichTextContentFieldLibraryType & HeadingAndTextFieldLibraryType;

export type GroupContentStyle = SectionStyleFieldLibraryType &
  HeadingStyleFieldLibraryType & {
    verticalAlignment: AlignmentFieldType['default'];
  };

// Style group types
export interface GroupStyle {
  groupContent: GroupContentStyle;
  groupButton: GroupButtonStyle;
}

// Main component props
export interface ImageAndTextProps {
  moduleName?: string;
  groupImage: GroupImage;
  groupContent: GroupContent;
  groupButton: GroupButton;
  groupStyle: GroupStyle;
}

// Utility types for stories and testing
export interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading: 'lazy' | 'eager';
}

export interface ImageAndTextOptions {
  imagePosition?: ElementPositionType;
  showButton?: boolean;
  headingLevel?: GroupContent['headingAndTextHeadingLevel'];
  buttonText?: string;
  imageConfig?: Partial<ImageConfig>;
  styleOverrides?: {
    groupContent?: Partial<GroupContentStyle>;
    groupButton?: Partial<GroupButtonStyle>;
  };
}

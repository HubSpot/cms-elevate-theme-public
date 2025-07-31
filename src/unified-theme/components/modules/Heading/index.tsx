import { ModuleMeta } from '../../types/modules.js';
import { TextAlignmentFieldType } from '@hubspot/cms-components/fields';
import headingIconSvg from './assets/heading.svg';
import HeadingComponent from '../../HeadingComponent/index.js';
import { SectionVariantType } from '../../types/fields.js';
import styles from './heading.module.css';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { HEADING_TEXT_FIELD_NAME } from '../../fieldLibrary/HeadingAndText/index.js';
import { generateInlineFieldsToken } from '../../utils/generate-inline-field-token.js';

const swm = staticWithModule(styles);

// Types

type GroupStyle = SectionStyleFieldLibraryType &
  HeadingStyleFieldLibraryType & {
    alignment?: TextAlignmentFieldType['default'];
  };
type HeadingProps = HeadingAndTextFieldLibraryType & {
  moduleName: string;
  groupStyle: GroupStyle;
};

// Heading

// Functions to pull in corresponding CSS variables on component based on field values

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  const textColor = sectionColorsMap[sectionVariantField]?.textColor || sectionColorsMap['section_variant_1'].textColor;

  return { '--hsElevate--heading__textColor': textColor };
}

// Components

const HeadingContainer = createComponent('div');

export const Component = (props: HeadingProps) => {
  const {
    headingAndTextHeadingLevel,
    headingAndTextHeading,
    groupStyle: { alignment, headingStyleVariant, sectionStyleVariant },
    moduleName,
  } = props;

  const cssVarsMap = { ...generateColorCssVars(sectionStyleVariant) };
  const dataToken = generateInlineFieldsToken(moduleName, HEADING_TEXT_FIELD_NAME);

  return (
    <HeadingContainer style={cssVarsMap} className={swm('hs-elevate-heading-container')}>
      <HeadingComponent
        additionalClassArray={['hs-elevate-heading-container__heading']}
        headingLevel={headingAndTextHeadingLevel}
        heading={headingAndTextHeading}
        alignment={alignment}
        headingStyleVariant={headingStyleVariant}
        inlineDataToken={dataToken}
      />
    </HeadingContainer>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Heading',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: headingIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/heading',
  version: 0,
  themeModule: true,
};

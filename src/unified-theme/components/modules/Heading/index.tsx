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
import cx from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';

// Types

type GroupStyle = SectionStyleFieldLibraryType &
  HeadingStyleFieldLibraryType & {
    alignment?: TextAlignmentFieldType['default'];
  };
type HeadingProps = HeadingAndTextFieldLibraryType & {
  groupStyle: GroupStyle;
};

// Heading

// Functions to pull in corresponding CSS variables on component based on field values

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--heading__textColor': sectionColorsMap[sectionVariantField].textColor,
  };
}

// Components

const HeadingContainer = createComponent('div');

export const Component = (props: HeadingProps) => {
  const {
    headingAndTextHeadingLevel,
    headingAndTextHeading,
    groupStyle: { alignment, headingStyleVariant, sectionStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  return (
    <HeadingContainer style={cssVarsMap} className={cx('hs-elevate-heading-container', styles['hs-elevate-heading-container'])}>
      <HeadingComponent
        additionalClassArray={['hs-elevate-heading-container__heading']}
        headingLevel={headingAndTextHeadingLevel}
        heading={headingAndTextHeading}
        alignment={alignment}
        headingStyleVariant={headingStyleVariant}
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

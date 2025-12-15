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
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';

const swm = staticWithModule(styles);

// Types

type GroupStyle = SectionStyleFieldLibraryType &
  HeadingStyleFieldLibraryType & {
    alignment?: TextAlignmentFieldType['default'];
  };
type HeadingProps = HeadingAndTextFieldLibraryType & {
  moduleName?: string;
  groupStyle: GroupStyle;
  hublData: {
    renderedWithGrids: boolean;
  };
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
    moduleName,
    headingAndTextHeadingLevel,
    headingAndTextHeading,
    groupStyle: { alignment, headingStyleVariant, sectionStyleVariant },
    hublData: { renderedWithGrids = false },
  } = props;

  const cssVarsMap = { ...generateColorCssVars(sectionStyleVariant) };

  const layoutClass = (renderedWithGrids ?? false) ? 'hs-elevate-heading-container--grids' : 'hs-elevate-heading-container--bootstrap';

  return (
    <HeadingContainer className={cx(swm('hs-elevate-heading-container'), styles[layoutClass])} style={cssVarsMap}>
      <HeadingComponent
        additionalClassArray={['hs-elevate-heading-container__heading']}
        headingLevel={headingAndTextHeadingLevel}
        heading={headingAndTextHeading}
        alignment={alignment}
        headingStyleVariant={headingStyleVariant}
        moduleName={moduleName}
        fieldPath="headingAndTextHeading"
      />
    </HeadingContainer>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "renderedWithGrids": rendered_with_grids,
    }
  %}
`;

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

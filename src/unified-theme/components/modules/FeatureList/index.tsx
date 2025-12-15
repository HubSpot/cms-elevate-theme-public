import { ModuleMeta } from '../../types/modules.js';
import { Icon } from '@hubspot/cms-components';
import { BooleanFieldType, IconFieldType, NumberFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import featureListIconSvg from './assets/list.svg';
import styles from './feature-list.module.css';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { getDataHSToken } from '../../utils/inline-editing.js';

const swm = staticWithModule(styles);

// Types

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type GroupFeatureContent = HeadingAndTextFieldLibraryType & {
  featureDescription?: TextFieldType['default'];
};

type GroupFeatures = {
  groupIcon?: {
    showIcon: BooleanFieldType['default'];
    icon?: IconFieldType['default'];
  };
  groupFeatureContent: GroupFeatureContent;
};

type Columns = NumberFieldType['default'];

type FeatureListProps = {
  moduleName?: string;
  columns: Columns;
  groupFeatures: GroupFeatures[];
  groupStyle: GroupStyle;
};

// Functions to pull in corresponding CSS variables on component based on field values

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--featureList__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--featureList__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

// Components

const FeatureList = createComponent('div');
const Feature = createComponent('div');
const ContentContainer = createComponent('div');
const FeatureParagraph = createComponent('p');

export const Component = (props: FeatureListProps) => {
  const {
    moduleName,
    columns,
    groupFeatures,
    groupStyle: { sectionStyleVariant, headingStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  const featureListClasses = cx(swm('hs-elevate-feature-list'), {
    [styles[`hs-elevate-feature-list--${columns}-columns`]]: columns,
  });

  return (
    <FeatureList className={featureListClasses} style={cssVarsMap}>
      {groupFeatures.map((feature, index) => (
        <Feature className={swm('hs-elevate-feature-list__feature')} key={index}>
          {feature?.groupIcon?.showIcon && feature?.groupIcon?.icon?.name && (
            <Icon className={swm('hs-elevate-feature-list__icon')} fieldPath={`groupFeatures[${index}].groupIcon.icon`} purpose="DECORATIVE" />
          )}
          <ContentContainer className={swm('hs-elevate-feature-list__content-container')}>
            {feature.groupFeatureContent.headingAndTextHeading && (
              <HeadingComponent
                additionalClassArray={['hs-elevate-feature-list__title']}
                headingLevel={feature.groupFeatureContent.headingAndTextHeadingLevel}
                headingStyleVariant={headingStyleVariant}
                heading={feature.groupFeatureContent.headingAndTextHeading}
                moduleName={moduleName}
                fieldPath={`groupFeatures[${index}].groupFeatureContent.headingAndTextHeading`}
              />
            )}
            {feature.groupFeatureContent.featureDescription && (
              <FeatureParagraph
                className={swm('hs-elevate-feature-list__body')}
                data-hs-token={getDataHSToken(moduleName, `groupFeatures[${index}].groupFeatureContent.featureDescription`)}
              >
                {feature.groupFeatureContent.featureDescription}
              </FeatureParagraph>
            )}
          </ContentContainer>
        </Feature>
      ))}
    </FeatureList>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Feature list',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: featureListIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/feature_list',
  version: 0,
  themeModule: true,
};

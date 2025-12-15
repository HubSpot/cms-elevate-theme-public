import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import styles from './metrics.module.css';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import chartIconSvg from './assets/chart.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType, HeadingStyleVariant } from '../../fieldLibrary/HeadingStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { getDataHSToken } from '../../utils/inline-editing.js';

const swm = staticWithModule(styles);

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type MetricProps = {
  moduleName?: string;
  groupMetrics: {
    metric: TextFieldType['default'];
    description: TextFieldType['default'];
  }[];
  groupStyle: GroupStyle;
  hublData: {
    renderedWithGrids: boolean;
  };
};

// Metrics component

// Functions to pull in corresponding CSS variables on component based on field values

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--metrics__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--metrics__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

// Based on the heading style a user selects for the metric number, we set a maximum font size and a minimum font size which is used for a font-size clamp on the MetricNumber component
function generateMetricCssVars(headingStyleAs: HeadingStyleVariant): CSSPropertiesMap {
  const metricCssVarsMap = {
    display_1: 'var(--hsElevate--display1__fontSize)',
    display_2: 'var(--hsElevate--display2__fontSize)',
    h1: 'var(--hsElevate--h1__fontSize)',
    h2: 'var(--hsElevate--h2__fontSize)',
    h3: 'var(--hsElevate--h3__fontSize)',
    h4: 'var(--hsElevate--h4__fontSize)',
    h5: 'var(--hsElevate--h5__fontSize)',
    h6: 'var(--hsElevate--h6__fontSize)',
  };

  return {
    '--hsElevate--metrics__maxFontSize': metricCssVarsMap[headingStyleAs],
    '--hsElevate--metrics__minFontSize': 'calc(var(--hsElevate--metrics__maxFontSize) * var(--hsElevate--heading__tablet-modifier))',
  };
}

// Components
const MetricsWrapper = createComponent('div');

// Helper function to get CSS class modifier based on metric count
function getMetricCountClass(metricCount: number): string {
  if ([2, 3, 4].includes(metricCount)) {
    return `hs-elevate-metrics__container--count-${metricCount}`;
  }
  return '';
}

const MetricsContainer = createComponent('div');
const Metric = createComponent('div');
const MetricNumber = createComponent('div');
const MetricDescription = createComponent('div');

export const Component = (props: MetricProps) => {
  const {
    moduleName,
    groupMetrics,
    groupStyle: { headingStyleVariant, sectionStyleVariant },
    hublData: { renderedWithGrids = false },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
    ...generateMetricCssVars(headingStyleVariant),
  };

  const metricCountClass = getMetricCountClass(groupMetrics.length);

  const layoutClass = (renderedWithGrids ?? false) ? 'hs-elevate-metrics--grids' : 'hs-elevate-metrics--bootstrap';

  return (
    <MetricsWrapper className={cx(swm('hs-elevate-metrics'), styles[layoutClass])}>
      <MetricsContainer
        className={cx('hs-elevate-metrics-container', styles['hs-elevate-metrics__container'], metricCountClass && styles[metricCountClass])}
        style={cssVarsMap}
      >
        {groupMetrics.map((metric, index) => {
          return (
            <Metric className={cx('hs-elevate-metrics-container__metric', styles['hs-elevate-metrics__metric'])} key={index}>
              <MetricNumber
                className={cx('hs-elevate-metrics-container__metric-number', styles['hs-elevate-metrics__metric-number'])}
                data-hs-token={getDataHSToken(moduleName, `groupMetrics[${index}].metric`)}
              >
                {metric.metric}
              </MetricNumber>
              <MetricDescription
                className={cx('hs-elevate-metrics-container__metric-description', styles['hs-elevate-metrics__metric-description'])}
                data-hs-token={getDataHSToken(moduleName, `groupMetrics[${index}].description`)}
              >
                {metric.description}
              </MetricDescription>
            </Metric>
          );
        })}
      </MetricsContainer>
    </MetricsWrapper>
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
  label: 'Metrics',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: chartIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/metrics',
  version: 0,
  themeModule: true,
};

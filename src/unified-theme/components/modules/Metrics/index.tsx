import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import chartIconSvg from './assets/chart.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type MetricProps = {
  groupMetrics: {
    metric: TextFieldType['default'];
    description: TextFieldType['default'];
  }[];
  groupStyle: GroupStyle;
};

// Metrics component

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  const sectionColorsMap = {
    section_variant_1: {
      textColor: 'var(--hsElevate--section--lightSection--1__textColor)',
      accentColor: 'var(--hsElevate--section--lightSection--1__accentColor)',
    },
    section_variant_2: {
      textColor: 'var(--hsElevate--section--lightSection--2__textColor)',
      accentColor: 'var(--hsElevate--section--lightSection--2__accentColor)',
    },
    section_variant_3: {
      textColor: 'var(--hsElevate--section--lightSection--3__textColor)',
      accentColor: 'var(--hsElevate--section--lightSection--3__accentColor)',
    },
    section_variant_4: {
      textColor: 'var(--hsElevate--section--darkSection--1__textColor)',
      accentColor: 'var(--hsElevate--section--darkSection--1__accentColor)',
    },
  };

  return {
    '--hsElevate--metrics__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--metrics__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

function getHeadingStyleAsClassName(headingStyleAs) {
  const headingStyleAsMap = {
    display_1: 'hs-elevate-display-1',
    display_2: 'hs-elevate-display-2',
    h1: 'hs-elevate-h1',
    h2: 'hs-elevate-h2',
    h3: 'hs-elevate-h3',
    h4: 'hs-elevate-h4',
    h5: 'hs-elevate-h5',
    h6: 'hs-elevate-h6',
  };

  return headingStyleAsMap[headingStyleAs] || 'display_1';
}

const MetricsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: var(--hsElevate--text__margin);

  &:last-child {
    margin-block: 0;
  }

  @media (min-width: 768px) {
    margin-block: 0;
  }
`;

const MetricNumber = styled.div`
  color: var(--hsElevate--metrics__accentColor);
`;

const MetricDescription = styled.div`
  color: var(--hsElevate--metrics__textColor);
`;

export const Component = (props: MetricProps) => {
  const {
    groupMetrics,
    groupStyle: { headingStyleVariant, sectionStyleVariant },
  } = props;

  const metricNumberClassName = getHeadingStyleAsClassName(headingStyleVariant);

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <MetricsContainer style={cssVarsMap}>
        {groupMetrics.map((metric, index) => {
          return (
            <Metric key={index}>
              <MetricNumber className={metricNumberClassName}>{metric.metric}</MetricNumber>
              <MetricDescription>{metric.description}</MetricDescription>
            </Metric>
          );
        })}
      </MetricsContainer>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

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

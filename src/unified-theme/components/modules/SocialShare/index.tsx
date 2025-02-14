import { ModuleMeta } from '../../types/modules.js';
import { styled } from 'styled-components';
import { Icon, usePageUrl } from '@hubspot/cms-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import socialIconSvg from './assets/social-follow.svg';
import { TextFieldType, AlignmentFieldType } from '@hubspot/cms-components/fields';
import { StandardSizeType, ButtonStyleType } from '../../types/fields.js';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';

// Types

type ShapeOption = 'square' | 'rounded' | 'circle';
type SizeOption = StandardSizeType;

type DefaultTextProps = {
  twitterLinkAriaLabel: TextFieldType['default'];
  facebookLinkAriaLabel: TextFieldType['default'];
  linkedinLinkAriaLabel: TextFieldType['default'];
  pinterestLinkAriaLabel: TextFieldType['default'];
  emailLinkAriaLabel: TextFieldType['default'];
};

type SocialShareProps = {
  platforms: ('twitter' | 'facebook' | 'linkedin' | 'pinterest' | 'email')[];
  groupDefaultText: DefaultTextProps;
  groupStyle: ButtonStyleFieldLibraryType & {
    shape: ShapeOption;
    spaceBetweenIcons: StandardSizeType;
    alignment: AlignmentFieldType['default'];
  };
};

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateIconSizeAndPaddingCssVars(iconSizeField: StandardSizeType): CSSPropertiesMap {
  const iconSizing = {
    small: {
      padding: 'var(--hsElevate--spacing--10, 10px)',
      iconSize: 'var(--hsElevate--icon--small__size)',
    },
    medium: {
      padding: 'var(--hsElevate--spacing--14, 14px)',
      iconSize: 'var(--hsElevate--icon--medium__size)',
    },
    large: {
      padding: 'var(--hsElevate--spacing--18, 18px)',
      iconSize: 'var(--hsElevate--icon--large__size)',
    },
  };

  return {
    '--hsElevate--socialShareIcon__padding': iconSizing[iconSizeField].padding,
    '--hsElevate--socialShareIcon__size': iconSizing[iconSizeField].iconSize,
  };
}

function generateIconShapeCssVars(iconShapeField: ShapeOption): CSSPropertiesMap {
  const iconShapeMap = {
    square: 'var(--hsElevate-sharp)',
    rounded: 'var(--hsElevate-rounded)',
    circle: 'var(--hsElevate-circle)',
  };

  return {
    '--hsElevate--socialShareIcon__shape': iconShapeMap[iconShapeField],
  };
}

function generateIconGapCssVars(iconGapField: SizeOption): CSSPropertiesMap {
  const iconGapMap = {
    small: 'var(--hsElevate--spacing--12, 12px)',
    medium: 'var(--hsElevate--spacing--24, 24px)',
    large: 'var(--hsElevate--spacing--48, 48px)',
  };

  return {
    '--hsElevate--socialShareIcon__gap': iconGapMap[iconGapField],
  };
}

function generateButtonStyles(buttonStyleVariant: ButtonStyleType): CSSPropertiesMap {
  const iconStyles = {
    primary: {
      backgroundColor: 'var(--hsElevate--button--primary__backgroundColor)',
      textColor: 'var(--hsElevate--button--primary__textColor)',
      borderColor: 'var(--hsElevate--button--primary__borderColor)',
      borderWidth: 'var(--hsElevate--button--primary__borderThickness)',
      hoverBackgroundColor: 'var(--hsElevate--button--primary__hover--backgroundColor)',
      hoverTextColor: 'var(--hsElevate--button--primary__hover--textColor)',
      hoverBorderColor: 'var(--hsElevate--button--primary__hover--borderColor)',
      hoverBorderWidth: 'var(--hsElevate--button--primary__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsElevate--button--primary__active--backgroundColor)',
      activeTextColor: 'var(--hsElevate--button--primary__active--textColor)',
      activeBorderColor: 'var(--hsElevate--button--primary__active--borderColor)',
      activeBorderWidth: 'var(--hsElevate--button--primary__active--borderThickness)',
    },
    secondary: {
      backgroundColor: 'var(--hsElevate--button--secondary__backgroundColor)',
      textColor: 'var(--hsElevate--button--secondary__textColor)',
      borderColor: 'var(--hsElevate--button--secondary__borderColor)',
      borderWidth: 'var(--hsElevate--button--secondary__borderThickness)',
      hoverBackgroundColor: 'var(--hsElevate--button--secondary__hover--backgroundColor)',
      hoverTextColor: 'var(--hsElevate--button--secondary__hover--textColor)',
      hoverBorderColor: 'var(--hsElevate--button--secondary__hover--borderColor)',
      hoverBorderWidth: 'var(--hsElevate--button--secondary__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsElevate--button--secondary__active--backgroundColor)',
      activeTextColor: 'var(--hsElevate--button--secondary__active--textColor)',
      activeBorderColor: 'var(--hsElevate--button--secondary__active--borderColor)',
      activeBorderWidth: 'var(--hsElevate--button--secondary__active--borderThickness)',
    },
    tertiary: {
      backgroundColor: 'var(--hsElevate--button--tertiary__backgroundColor)',
      textColor: 'var(--hsElevate--button--tertiary__textColor)',
      borderColor: 'var(--hsElevate--button--tertiary__borderColor)',
      borderWidth: 'var(--hsElevate--button--tertiary__borderThickness)',
      hoverBackgroundColor: 'var(--hsElevate--button--tertiary__hover--backgroundColor)',
      hoverTextColor: 'var(--hsElevate--button--tertiary__hover--textColor)',
      hoverBorderColor: 'var(--hsElevate--button--tertiary__hover--borderColor)',
      hoverBorderWidth: 'var(--hsElevate--button--tertiary__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsElevate--button--tertiary__active--backgroundColor)',
      activeTextColor: 'var(--hsElevate--button--tertiary__active--textColor)',
      activeBorderColor: 'var(--hsElevate--button--tertiary__active--borderColor)',
      activeBorderWidth: 'var(--hsElevate--button--tertiary__active--borderThickness)',
    },
    accent: {
      backgroundColor: 'var(--hsElevate--button--accent__backgroundColor)',
      textColor: 'var(--hsElevate--button--accent__textColor)',
      borderColor: 'var(--hsElevate--button--accent__borderColor)',
      borderWidth: 'var(--hsElevate--button--accent__borderThickness)',
      hoverBackgroundColor: 'var(--hsElevate--button--accent__hover--backgroundColor)',
      hoverTextColor: 'var(--hsElevate--button--accent__hover--textColor)',
      hoverBorderColor: 'var(--hsElevate--button--accent__hover--borderColor)',
      hoverBorderWidth: 'var(--hsElevate--button--accent__hover--borderThickness)',
      activeBackgroundColor: 'var(--hsElevate--button--accent__active--backgroundColor)',
      activeTextColor: 'var(--hsElevate--button--accent__active--textColor)',
      activeBorderColor: 'var(--hsElevate--button--accent__active--borderColor)',
      activeBorderWidth: 'var(--hsElevate--button--accent__active--borderThickness)',
    },
  };

  return {
    '--hsElevate--socialShareIcon__backgroundColor': iconStyles[buttonStyleVariant].backgroundColor,
    '--hsElevate--socialShareIcon__color': iconStyles[buttonStyleVariant].textColor,
    '--hsElevate--socialShareIcon__borderColor': iconStyles[buttonStyleVariant].borderColor,
    '--hsElevate--socialShareIcon__borderWidth': iconStyles[buttonStyleVariant].borderWidth,
    '--hsElevate--socialShareIcon__hover--backgroundColor': iconStyles[buttonStyleVariant].hoverBackgroundColor,
    '--hsElevate--socialShareIcon__hover--color': iconStyles[buttonStyleVariant].hoverTextColor,
    '--hsElevate--socialShareIcon__hover--borderColor': iconStyles[buttonStyleVariant].hoverBorderColor,
    '--hsElevate--socialShareIcon__hover--borderWidth': iconStyles[buttonStyleVariant].hoverBorderWidth,
    '--hsElevate--socialShareIcon__active--backgroundColor': iconStyles[buttonStyleVariant].activeBackgroundColor,
    '--hsElevate--socialShareIcon__active--color': iconStyles[buttonStyleVariant].activeTextColor,
    '--hsElevate--socialShareIcon__active--borderColor': iconStyles[buttonStyleVariant].activeBorderColor,
    '--hsElevate--socialShareIcon__active--borderWidth': iconStyles[buttonStyleVariant].activeBorderWidth,
  };
}

type StyledSocialShareProps = {
  $alignment: AlignmentFieldType['default'];
};

const StyledSocialShare = styled.div<StyledSocialShareProps>`
  display: flex;
  align-items: center;
  ${props => getAlignmentFieldCss(props.$alignment)};
  gap: var(--hsElevate--socialShareIcon__gap);
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--hsElevate--socialShareIcon__shape);
  background-color: var(--hsElevate--socialShareIcon__backgroundColor);
  border-color: var(--hsElevate--socialShareIcon__borderColor);
  border-style: solid;
  border-width: var(--hsElevate--socialShareIcon__borderWidth);
  padding: var(--hsElevate--socialShareIcon__padding);

  svg {
    fill: var(--hsElevate--socialShareIcon__color);
  }

  &:hover {
    background-color: var(--hsElevate--socialShareIcon__hover--backgroundColor);
    border-color: var(--hsElevate--socialShareIcon__hover--borderColor);
    border-width: var(--hsElevate--socialShareIcon__hover--borderWidth);

    svg {
      fill: var(--hsElevate--socialShareIcon__hover--color);
    }
  }

  &:active {
    background-color: var(--hsElevate--socialShareIcon__active--backgroundColor);
    border-color: var(--hsElevate--socialShareIcon__active--borderColor);
    border-width: var(--hsElevate--socialShareIcon__active--borderWidth);

    svg {
      fill: var(--hsElevate--socialShareIcon__active--color);
    }
  }

  &:focus {
    outline: 2px solid #53acff;
    outline-offset: 2px;
  }
`;

const SocialIcon = styled(Icon)`
  width: var(--hsElevate--socialShareIcon__size);
  height: var(--hsElevate--socialShareIcon__size);
`;

function getPlatformMetaData(socialLink: string, defaultText: DefaultTextProps) {
  const platformMetaData = {
    twitter: {
      name: 'twitter',
      aria_label: defaultText.twitterLinkAriaLabel,
      base_url: 'https://twitter.com/intent/tweet?url=',
    },
    facebook: {
      name: 'facebook',
      aria_label: defaultText.facebookLinkAriaLabel,
      base_url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    linkedin: {
      name: 'linkedin',
      aria_label: defaultText.linkedinLinkAriaLabel,
      base_url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
    pinterest: {
      name: 'pinterest',
      aria_label: defaultText.pinterestLinkAriaLabel,
      base_url: 'https://pinterest.com/pin/create/button/?url=',
    },
    email: {
      name: 'envelope',
      aria_label: defaultText.emailLinkAriaLabel,
      base_url: 'mailto:',
    },
  };

  return platformMetaData[socialLink] || {};
}

export const Component = (props: SocialShareProps) => {
  const {
    platforms,
    groupDefaultText,
    groupStyle: { shape, buttonStyleVariant, buttonStyleSize, spaceBetweenIcons, alignment },
  } = props;

  const cssVarsMap = {
    ...generateIconSizeAndPaddingCssVars(buttonStyleSize),
    ...generateIconShapeCssVars(shape),
    ...generateIconGapCssVars(spaceBetweenIcons),
    ...generateButtonStyles(buttonStyleVariant),
  };

  const currentUrl = usePageUrl().href;

  return (
    <StyledComponentsRegistry>
      <StyledSocialShare $alignment={alignment} style={cssVarsMap}>
        {platforms.map(platform => {
          if (!currentUrl) {
            return null;
          }

          const platformMetaData = getPlatformMetaData(platform, groupDefaultText);

          let iconFieldPath = `groupDefaultIcons.${platformMetaData.name}`;

          return (
            <SocialLink key={platform} href={`${platformMetaData.base_url}${encodeURIComponent(currentUrl)}`} aria-label={platformMetaData.aria_label}>
              <SocialIcon purpose="DECORATIVE" fieldPath={iconFieldPath} />
            </SocialLink>
          );
        })}
      </StyledSocialShare>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Social share',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: socialIconSvg,
  categories: ['media'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/social_share',
  version: 0,
  themeModule: true,
};

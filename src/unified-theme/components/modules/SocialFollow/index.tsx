import { ModuleMeta } from '../../types/modules.js';
import { Icon } from '@hubspot/cms-components';
import socialIconSvg from './assets/social-follow.svg';
import { IconFieldType, LinkFieldType, TextFieldType, AlignmentFieldType, BooleanFieldType } from '@hubspot/cms-components/fields';
import { StandardSizeType, ButtonStyleType } from '../../types/fields.js';
import { getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import styles from './social-follow.module.css';
import { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';

const swm = staticWithModule(styles);

// Types

type ShapeOption = 'square' | 'rounded' | 'circle';
type SizeOption = StandardSizeType;

type SocialLink = {
  groupLink: {
    link: LinkFieldType['default'];
  };
  groupIcon: {
    customizeIcon: BooleanFieldType['default'];
    icon: IconFieldType['default'];
  };
};

type DefaultTextProps = {
  twitterLinkAriaLabel: TextFieldType['default'];
  youtubeLinkAriaLabel: TextFieldType['default'];
  facebookLinkAriaLabel: TextFieldType['default'];
  linkedinLinkAriaLabel: TextFieldType['default'];
  instagramLinkAriaLabel: TextFieldType['default'];
  githubLinkAriaLabel: TextFieldType['default'];
  spotifyLinkAriaLabel: TextFieldType['default'];
  soundcloudLinkAriaLabel: TextFieldType['default'];
  yelpLinkAriaLabel: TextFieldType['default'];
  pinterestLinkAriaLabel: TextFieldType['default'];
  tiktokLinkAriaLabel: TextFieldType['default'];
  emailLinkAriaLabel: TextFieldType['default'];
  websiteLinkAriaLabel: TextFieldType['default'];
};

type SocialFollowProps = {
  groupSocialLinks: SocialLink[];
  groupDefaultText: DefaultTextProps;
  groupStyle: ButtonStyleFieldLibraryType & {
    shape: ShapeOption;
    spaceBetweenIcons: StandardSizeType;
    alignment: AlignmentFieldType['default'];
  };
};

// Social follow component

// Functions to pull in corresponding CSS variables on component based on field values

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
    '--hsElevate--socialFollowIcon__padding': iconSizing[iconSizeField].padding,
    '--hsElevate--socialFollowIcon__size': iconSizing[iconSizeField].iconSize,
  };
}

function generateIconShapeCssVars(iconShapeField: ShapeOption): CSSPropertiesMap {
  const iconShapeMap = {
    square: 'var(--hsElevate-sharp)',
    rounded: 'var(--hsElevate-rounded)',
    circle: 'var(--hsElevate-circle)',
  };

  return {
    '--hsElevate--socialFollowIcon__shape': iconShapeMap[iconShapeField],
  };
}

function generateIconGapCssVars(iconGapField: SizeOption): CSSPropertiesMap {
  const iconGapMap = {
    small: 'var(--hsElevate--spacing--12, 12px)',
    medium: 'var(--hsElevate--spacing--24, 24px)',
    large: 'var(--hsElevate--spacing--48, 48px)',
  };

  return {
    '--hsElevate--socialFollowIcon__gap': iconGapMap[iconGapField],
  };
}

function generateAlignmentCssVars(alignmentField: AlignmentFieldType['default']): CSSPropertiesMap {
  const alignmentCss = getAlignmentFieldCss(alignmentField);

  return {
    '--hsElevate--socialFollow__justifyContent': alignmentCss.justifyContent || 'flex-start',
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
    '--hsElevate--socialFollowIcon__backgroundColor': iconStyles[buttonStyleVariant].backgroundColor,
    '--hsElevate--socialFollowIcon__color': iconStyles[buttonStyleVariant].textColor,
    '--hsElevate--socialFollowIcon__borderColor': iconStyles[buttonStyleVariant].borderColor,
    '--hsElevate--socialFollowIcon__borderWidth': iconStyles[buttonStyleVariant].borderWidth,
    '--hsElevate--socialFollowIcon__hover--backgroundColor': iconStyles[buttonStyleVariant].hoverBackgroundColor,
    '--hsElevate--socialFollowIcon__hover--color': iconStyles[buttonStyleVariant].hoverTextColor,
    '--hsElevate--socialFollowIcon__hover--borderColor': iconStyles[buttonStyleVariant].hoverBorderColor,
    '--hsElevate--socialFollowIcon__hover--borderWidth': iconStyles[buttonStyleVariant].hoverBorderWidth,
    '--hsElevate--socialFollowIcon__active--backgroundColor': iconStyles[buttonStyleVariant].activeBackgroundColor,
    '--hsElevate--socialFollowIcon__active--color': iconStyles[buttonStyleVariant].activeTextColor,
    '--hsElevate--socialFollowIcon__active--borderColor': iconStyles[buttonStyleVariant].activeBorderColor,
    '--hsElevate--socialFollowIcon__active--borderWidth': iconStyles[buttonStyleVariant].activeBorderWidth,
  };
}

// Components

const SocialFollowContainer = createComponent('div');
const SocialLink = createComponent('a');

function getSocialIcon(socialLink: string, defaultText: DefaultTextProps) {
  const icons = {
    'x.com': {
      name: 'twitter',
      aria_label: defaultText.twitterLinkAriaLabel,
    },
    'twitter.com': {
      name: 'twitter',
      aria_label: defaultText.twitterLinkAriaLabel,
    },
    'youtube.com': {
      name: 'youtube',
      aria_label: defaultText.youtubeLinkAriaLabel,
    },
    'facebook.com': {
      name: 'facebook',
      aria_label: defaultText.facebookLinkAriaLabel,
    },
    'linkedin.com': {
      name: 'linkedin',
      aria_label: defaultText.linkedinLinkAriaLabel,
    },
    'instagram.com': {
      name: 'instagram',
      aria_label: defaultText.instagramLinkAriaLabel,
    },
    'github.com': {
      name: 'github',
      aria_label: defaultText.githubLinkAriaLabel,
    },
    'spotify.com': {
      name: 'spotify',
      aria_label: defaultText.spotifyLinkAriaLabel,
    },
    'soundcloud.com': {
      name: 'soundcloud',
      aria_label: defaultText.soundcloudLinkAriaLabel,
    },
    'yelp.com': {
      name: 'yelp',
      aria_label: defaultText.yelpLinkAriaLabel,
    },
    'pinterest.com': {
      name: 'pinterest',
      aria_label: defaultText.pinterestLinkAriaLabel,
    },
    'tiktok.com': {
      name: 'tiktok',
      aria_label: defaultText.tiktokLinkAriaLabel,
    },
    email: {
      name: 'envelope',
      aria_label: defaultText.emailLinkAriaLabel,
    },
  };

  return icons[socialLink] || { name: 'link', aria_label: defaultText.websiteLinkAriaLabel };
}

/**
 * Extracts the host from a given URL by removing the protocol (http:// or https://)
 * and optional prefixes (www. or open.). It then splits the URL by the first slash to get only the host.
 *
 * @param {string} socialLink - The URL from which to extract the host.
 * @returns {string} - The extracted host part of the URL.
 *
 * Example:
 * const socialLink = "https://podcasts.apple.com";
 * const host = getHostFromUrl(socialLink);
 * console.log(host); // Output: "podcasts.apple.com"
 */

function getHostFromUrl(socialLink: string) {
  return socialLink.replace(/https?:\/\/(www\.|open\.)?/, '').split('/')[0];
}

function getHost(linkType: string, href: string) {
  if (linkType === 'EMAIL_ADDRESS') {
    return 'email';
  }

  return getHostFromUrl(href);
}

export const Component = (props: SocialFollowProps) => {
  const {
    groupSocialLinks,
    groupDefaultText,
    groupStyle: { shape, buttonStyleVariant, buttonStyleSize, spaceBetweenIcons, alignment },
  } = props;

  const cssVarsMap = {
    ...generateIconSizeAndPaddingCssVars(buttonStyleSize),
    ...generateIconShapeCssVars(shape),
    ...generateIconGapCssVars(spaceBetweenIcons),
    ...generateAlignmentCssVars(alignment),
    ...generateButtonStyles(buttonStyleVariant),
  };

  return (
    <SocialFollowContainer className={swm('hs-elevate-social-follow')} style={cssVarsMap}>
      {groupSocialLinks.map((socialLink, index) => {
        const {
          groupLink: { link },
          groupIcon: { customizeIcon },
        } = socialLink;

        if (!link || !link.url) {
          return null;
        }

        const host = getHost(link.url.type, link.url.href);
        const socialIcon = getSocialIcon(host, groupDefaultText);

        let iconFieldPath = `groupDefaultIcons.${socialIcon.name}`;
        if (customizeIcon) {
          iconFieldPath = `groupSocialLinks[${index}].groupIcon.customIcon`;
        }

        return (
          <SocialLink
            className={swm('hs-elevate-social-follow__link')}
            key={index}
            rel={getLinkFieldRel(link)}
            target={getLinkFieldTarget(link)}
            href={link.url.href}
            aria-label={socialIcon.aria_label}
          >
            <Icon className={swm('hs-elevate-social-follow__icon')} purpose="DECORATIVE" fieldPath={iconFieldPath} />
          </SocialLink>
        );
      })}
    </SocialFollowContainer>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Social follow',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: socialIconSvg,
  categories: ['media'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/social_follow',
  version: 0,
  themeModule: true,
};

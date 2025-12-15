import { ModuleMeta } from '../../types/modules.js';
import { Icon, RichText } from '@hubspot/cms-components';
import { AlignmentFieldType, BooleanFieldType, IconFieldType, ImageFieldType } from '@hubspot/cms-components/fields';
import { ButtonStyleType, StandardSizeType } from '../../types/fields.js';
import cardIconSvg from './assets/card-icon-temp.svg';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { Card } from '../../CardComponent/index.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import styles from './card.module.css';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import { Button } from '../../ButtonComponent/index.js';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';
import { getDataHSToken } from '../../utils/inline-editing.js';

const swm = staticWithModule(styles);

// Types

type IconGroup = {
  groupIcon: {
    icon: IconFieldType['default'];
  };
};

type ImageGroup = {
  groupImage: {
    image: ImageFieldType['default'];
  };
};

type ContentGroup = {
  groupContent: RichTextContentFieldLibraryType & HeadingAndTextFieldLibraryType;
};

type ButtonGroup = {
  groupButton: ButtonContentType & {
    showButton: BooleanFieldType['default'];
  };
};

type GroupCards = IconGroup & ImageGroup & ContentGroup & ButtonGroup;

type GroupCardStyles = {
  groupCard: CardStyleFieldLibraryType & {
    cardOrientation: 'row' | 'column';
  };
};

type GroupContentStyles = {
  groupContent: HeadingStyleFieldLibraryType & {
    alignment: AlignmentFieldType['default'];
  };
};

type GroupButtonStyles = {
  groupButton: {
    buttonStyleSize: StandardSizeType;
    buttonStyleVariant: ButtonStyleType;
  };
};

type GroupStyle = GroupCardStyles & GroupContentStyles & GroupButtonStyles;

type CardProps = {
  moduleName?: string;
  imageOrIcon: 'icon' | 'image';
  groupCards: GroupCards[];
  groupStyle: GroupStyle;
  hublData: {
    renderedWithGrids: boolean;
  };
};

// Functions to generate CSS variables

function generateAlignmentCssVars(alignment: AlignmentFieldType['default']): CSSPropertiesMap {
  const textAlignment = alignment.horizontal_align?.toLowerCase() as 'left' | 'right' | 'center';
  return {
    '--hsElevate--card__alignment': getAlignmentFieldCss(alignment).justifyContent,
    '--hsElevate--card__textAlignment': textAlignment,
  };
}

function generateColorCssVars(cardVariantField: string): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: {
      borderRadius: 'var(--hsElevate--card--variant1__iconBorderRadius)',
      fillColor: 'var(--hsElevate--card--variant1__iconColor)',
      backgroundColor: 'var(--hsElevate--card--variant1__iconBackgroundColor)',
    },
    card_variant_2: {
      borderRadius: 'var(--hsElevate--card--variant2__iconBorderRadius)',
      fillColor: 'var(--hsElevate--card--variant2__iconColor)',
      backgroundColor: 'var(--hsElevate--card--variant2__iconBackgroundColor)',
    },
    card_variant_3: {
      borderRadius: 'var(--hsElevate--card--variant3__iconBorderRadius)',
      fillColor: 'var(--hsElevate--card--variant3__iconColor)',
      backgroundColor: 'var(--hsElevate--card--variant3__iconBackgroundColor)',
    },
    card_variant_4: {
      borderRadius: 'var(--hsElevate--card--variant4__iconBorderRadius)',
      fillColor: 'var(--hsElevate--card--variant4__iconColor)',
      backgroundColor: 'var(--hsElevate--card--variant4__iconBackgroundColor)',
    },
  };

  return {
    '--hsElevate--cardIcon__borderRadius': iconColorsMap[cardVariantField].borderRadius,
    '--hsElevate--cardIcon__fillColor': iconColorsMap[cardVariantField].fillColor,
    '--hsElevate--cardIcon__backgroundColor': iconColorsMap[cardVariantField].backgroundColor,
  };
}

// Checks if image path has '-use-background-' in its name to get the card icon's background color applied

function imageShouldUseBackground(imagePath: string): boolean {
  if (!imagePath) {
    return false;
  }
  return /-use-background-/.test(imagePath);
}

// Components

const CardContainer = createComponent('div');
const IconWrapper = createComponent('div');
const ImageWrapper = createComponent('div');
const Image = createComponent('img');
const CardContent = createComponent('div');
const ButtonWrapper = createComponent('div');

export const Component = (props: CardProps) => {
  const {
    moduleName,
    imageOrIcon,
    groupCards,
    groupStyle: {
      groupCard: { cardStyleVariant, cardOrientation },
      groupContent: { alignment, headingStyleVariant },
      groupButton: { buttonStyleVariant, buttonStyleSize },
    },
    hublData: { renderedWithGrids = false },
  } = props;

  const isIcon = imageOrIcon === 'icon';
  const isImage = imageOrIcon === 'image';
  const textAlignment = alignment.horizontal_align?.toLowerCase() as 'left' | 'right' | 'center';

  const headingInlineStyles = { textAlign: textAlignment };

  const cssVarsMap = {
    ...generateColorCssVars(cardStyleVariant),
    ...generateAlignmentCssVars(alignment),
  };

  const layoutClass = (renderedWithGrids ?? false) ? 'hs-elevate-card-container--grids' : 'hs-elevate-card-container--bootstrap';

  return (
    <CardContainer className={cx(swm('hs-elevate-card-container'), styles[layoutClass])} style={cssVarsMap}>
      {groupCards.map((card, index) => {
        const {
          groupButton: {
            showButton,
            buttonContentText: text,
            buttonContentLink: link = {},
            buttonContentShowIcon: showIcon,
            buttonContentIconPosition: iconPosition,
          },
        } = card;
        const hasValidImageSrc = card?.groupImage?.image?.src;
        const isCardImageWithBackground = hasValidImageSrc && imageShouldUseBackground(card.groupImage.image.src);
        const cardImageUsesBackground = isImage && isCardImageWithBackground;
        const isImageVisible = isImage && hasValidImageSrc;
        const hasValidIconName = card?.groupIcon?.icon?.name;
        const isIconVisible = isIcon && hasValidIconName;

        const cardClasses = cx('hs-elevate-card-container__card', styles[`hs-elevate-card-container__card--${cardOrientation}`], {
          [styles['hs-elevate-card-container__card--no-button']]: !showButton,
        });

        const imageWrapperClasses = cx(swm('hs-elevate-card-container__image-wrapper'), {
          [styles['hs-elevate-card-container__image-wrapper--use-background']]: cardImageUsesBackground,
        });

        return (
          <Card additionalClassArray={[cardClasses]} key={index} cardStyleVariant={cardStyleVariant} cardOrientation={cardOrientation}>
            {isIconVisible && (
              <IconWrapper className={swm('hs-elevate-card-container__icon-wrapper')}>
                <Icon className={swm('hs-elevate-card-container__icon')} purpose="DECORATIVE" fieldPath={`groupCards[${index}].groupIcon.icon`} />
              </IconWrapper>
            )}
            {isImageVisible && (
              <ImageWrapper className={cx(imageWrapperClasses)}>
                <Image
                  className={swm('hs-elevate-card-container__image')}
                  src={card.groupImage.image.src}
                  alt={card.groupImage.image.alt}
                  width={card.groupImage.image.width}
                  height={card.groupImage.image.height}
                  loading={card.groupImage.image.loading !== 'disabled' ? card.groupImage.image.loading : 'eager'}
                />
              </ImageWrapper>
            )}
            <CardContent className={swm('hs-elevate-card-container__content')}>
              {card.groupContent.headingAndTextHeading && (
                <HeadingComponent
                  headingLevel={card.groupContent.headingAndTextHeadingLevel}
                  heading={card.groupContent.headingAndTextHeading}
                  headingStyleVariant={headingStyleVariant}
                  inlineStyles={headingInlineStyles}
                  additionalClassArray={['hs-elevate-card-container__title']}
                  moduleName={moduleName}
                  fieldPath={`groupCards[${index}].groupContent.headingAndTextHeading`}
                />
              )}
              <RichText
                fieldPath={`groupCards[${index}].groupContent.richTextContentHTML`}
                className={swm('hs-elevate-card-container__body')}
                data-hs-token={getDataHSToken(moduleName, `groupCards[${index}].groupContent.richTextContentHTML`)}
              />
              {showButton && (
                <ButtonWrapper className={swm('hs-elevate-card-container__button-wrapper')}>
                  <Button
                    buttonSize={buttonStyleSize}
                    buttonStyle={buttonStyleVariant}
                    href={getLinkFieldHref(link)}
                    rel={getLinkFieldRel(link)}
                    target={getLinkFieldTarget(link)}
                    iconFieldPath={`groupCards[${index}].groupButton.buttonContentIcon`}
                    showIcon={showIcon}
                    iconPosition={iconPosition}
                    additionalClassArray={['hs-elevate-card-container__button']}
                    moduleName={moduleName}
                    textFieldPath={`groupCards[${index}].groupButton.buttonContentText`}
                  >
                    {text}
                  </Button>
                </ButtonWrapper>
              )}
            </CardContent>
          </Card>
        );
      })}
    </CardContainer>
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
  label: 'Card',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: cardIconSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/card',
  version: 0,
  themeModule: true,
};

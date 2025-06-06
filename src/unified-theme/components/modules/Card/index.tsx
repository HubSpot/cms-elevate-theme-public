import { ModuleMeta } from '../../types/modules.js';
import { Icon, RichText } from '@hubspot/cms-components';
import { AlignmentFieldType, BooleanFieldType, IconFieldType, ImageFieldType } from '@hubspot/cms-components/fields';
import { ButtonStyleType, StandardSizeType } from '../../types/fields.js';
import cardIconSvg from './assets/card-icon-temp.svg';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { Card } from '../../CardComponent/index.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import { Button } from '../../ButtonComponent/index.js';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';

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
  imageOrIcon: 'icon' | 'image';
  groupCards: GroupCards[];
  groupStyle: GroupStyle;
};

// Card component

const CardContainer = styled.div`
  container-type: normal;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: var(--hsElevate--spacing--24, 24px);
  justify-content: center;

  @container (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

type IconWrapperProps = {
  $cardOrientation: 'row' | 'column';
  $alignment: AlignmentFieldType['default'];
};

function getCardJustifyContent(alignment: AlignmentFieldType['default'], cardOrientation: 'row' | 'column') {
  if (cardOrientation === 'column') {
    return getAlignmentFieldCss(alignment).justifyContent;
  }
  return 'center';
}

const IconWrapper = styled.div<IconWrapperProps>`
  height: 72px;
  width: 72px;
  display: flex;
  align-items: center;
  align-self: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};
  justify-content: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};
  margin-block-end: var(--hsElevate--spacing--24, 24px);

  @media (min-width: 1000px) {
    align-self: ${props => getCardJustifyContent(props.$alignment, props.$cardOrientation)};
    justify-content: ${props => getCardJustifyContent(props.$alignment, props.$cardOrientation)};
    margin-inline-end: ${props => (props.$cardOrientation == 'row' ? 'var(--hsElevate--spacing--24, 24px)' : '0')};
    margin-block-end: ${props => (props.$cardOrientation === 'column' ? 'var(--hsElevate--spacing--24, 24px)' : '0')};
  }
`;

type CSSPropertiesMap = { [key: string]: string };

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

const StyledIcon = styled(Icon)`
  height: 72px;
  width: 72px;
  padding: var(--hsElevate--spacing--16, 16px);
  border-radius: var(--hsElevate--cardIcon__borderRadius);
  fill: var(--hsElevate--cardIcon__fillColor);
  background-color: var(--hsElevate--cardIcon__backgroundColor);
`;

// Checks if an image path corresponds to one of the default images used on the card module in one of our sections/templates
function isDefaultImage(imagePath: string): boolean {
  if (!imagePath) return false;
  return /team-member-small(?:-med)?-[1-5]/.test(imagePath);
}

type ImageWrapperProps = {
  $alignment: AlignmentFieldType['default'];
  $cardOrientation: 'row' | 'column';
  $isDefaultCardImage: boolean;
};

const ImageWrapper = styled.div<ImageWrapperProps>`
  overflow: hidden;
  display: flex;
  align-self: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};
  justify-content: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};
  margin-block-end: var(--hsElevate--spacing--24, 24px);
  height: auto;
  max-width: 100%;

  img {
    height: auto;
    max-width: min(250px, 100%);
    min-width: 80px;
    -o-object-fit: contain;
    object-fit: contain;
    -o-object-position: center;
    object-position: center;
    ${props =>
      props.$isDefaultCardImage &&
      `
      background-color: var(--hsElevate--cardIcon__backgroundColor);
      border-radius: var(--hsElevate-rounded--large);
    `}
  }

  @media (min-width: 1000px) {
    align-self: ${props => getCardJustifyContent(props.$alignment, props.$cardOrientation)};
    justify-content: ${props => getCardJustifyContent(props.$alignment, props.$cardOrientation)};
    margin-block-end: ${props => (props.$cardOrientation === 'column' ? 'var(--hsElevate--spacing--24, 24px)' : '0')};
    margin-inline-end: ${props => (props.$cardOrientation === 'row' ? 'var(--hsElevate--spacing--24, 24px)' : '0')};
    ${props =>
      props.$cardOrientation === 'row' &&
      `
      flex: 0 0 auto;
      max-width: 40%;
    `}
  }
`;

type StyledRichTextProps = {
  $alignment: AlignmentFieldType['default'];
  $showButton: boolean;
};

const StyledRichText = styled(RichText)<StyledRichTextProps>`
  text-align: ${props => props.$alignment.horizontal_align};

  ${props =>
    !props.$showButton &&
    `& > *:last-child {
      margin-block-end: 0;
    }`}
`;

type CardContentProps = {
  $alignment: AlignmentFieldType['default'];
  $cardOrientation: 'row' | 'column';
};

const CardContent = styled.div<CardContentProps>`
  display: flex;
  flex-direction: column;
  align-self: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};

  &:last-child {
    margin-block-end: 0;
  }

  @media (min-width: 1000px) {
    align-self: ${props => getCardJustifyContent(props.$alignment, props.$cardOrientation)};
    ${props => props.$cardOrientation === 'row' && `flex: 1 1 auto;`}
  }
`;

const ButtonContainer = styled.div<{
  $alignment: AlignmentFieldType['default'];
}>`
  align-self: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};
`;

export const Component = (props: CardProps) => {
  const {
    imageOrIcon,
    groupCards,
    groupStyle: {
      groupCard: { cardStyleVariant, cardOrientation },
      groupContent: { alignment, headingStyleVariant },
      groupButton: { buttonStyleVariant, buttonStyleSize },
    },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(cardStyleVariant),
  };
  const isIcon = imageOrIcon === 'icon';
  const isImage = imageOrIcon === 'image';
  const textAlignment = alignment.horizontal_align?.toLowerCase() as 'left' | 'right' | 'center';

  const headingInlineStyles = {
    textAlign: textAlignment
  };

  return (
    <StyledComponentsRegistry>
      <CardContainer className="hs-elevate-card-container" style={cssVarsMap}>
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
          const isDefaultCardImage = hasValidImageSrc && isDefaultImage(card.groupImage.image.src);
          const usesDefaultCardImage = isImage && isDefaultCardImage;
          const isImageVisible = isImage && hasValidImageSrc;
          const hasValidIconName = card?.groupIcon?.icon?.name;
          const isIconVisible = isIcon && hasValidIconName;

          return (
            <Card additionalClassArray={['hs-elevate-card-container__card']} key={index} cardStyleVariant={cardStyleVariant} cardOrientation={cardOrientation}>
              {isIconVisible && (
                <IconWrapper className="hs-elevate-card-container__icon-wrapper" $cardOrientation={cardOrientation} $alignment={alignment}>
                  <StyledIcon purpose="DECORATIVE" fieldPath={`groupCards[${index}].groupIcon.icon`} />
                </IconWrapper>
              )}
              {isImageVisible && (
                <ImageWrapper
                  className="hs-elevate-card-container__image-wrapper"
                  $cardOrientation={cardOrientation}
                  $alignment={alignment}
                  $isDefaultCardImage={usesDefaultCardImage}
                >
                  <img
                    className="hs-elevate-card-container__image"
                    src={card.groupImage.image.src}
                    alt={card.groupImage.image.alt}
                    width={card.groupImage.image.width}
                    height={card.groupImage.image.height}
                    loading={card.groupImage.image.loading !== 'disabled' ? card.groupImage.image.loading : 'eager'}
                  />
                </ImageWrapper>
              )}
              <CardContent className="hs-elevate-card-container__content" $alignment={alignment} $cardOrientation={cardOrientation}>
                {card.groupContent.headingAndTextHeading && (
                  <HeadingComponent
                    headingLevel={card.groupContent.headingAndTextHeadingLevel}
                    heading={card.groupContent.headingAndTextHeading}
                    headingStyleVariant={headingStyleVariant}
                    inlineStyles={headingInlineStyles}
                    additionalClassArray={['hs-elevate-card-container__title']}
                  />
                )}
                <StyledRichText
                  $alignment={alignment}
                  $showButton={showButton}
                  fieldPath={`groupCards[${index}].groupContent.richTextContentHTML`}
                  className="hs-elevate-card-container__body"
                />
                {showButton && (
                  <ButtonContainer className="hs-elevate-card-container__button-wrapper" $alignment={alignment}>
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
                    >
                      {text}
                    </Button>
                  </ButtonContainer>
                )}
              </CardContent>
            </Card>
          );
        })}
      </CardContainer>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

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

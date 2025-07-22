import { Card } from '../CardComponent/index.js';
import styles from './blog-card.module.css';
import cx, { staticWithModule } from '../utils/classnames.js';
import { createComponent } from '../utils/create-component.js';
import { TagComponent } from '../TagComponent/index.js';
import HeadingComponent from '../HeadingComponent/index.js';
import SanitizedContent from '../SanitizeHTML/index.js';
import { CardVariantType, HeadingLevelType } from '../types/fields.js';
import { HeadingStyleVariant } from '../fieldLibrary/HeadingStyle/types.js';
import { CSSPropertiesMap } from '../types/components.js';

const swm = staticWithModule(styles);

// Types

interface BlogCardComponentProps {
  post: {
    id: string;
    absoluteUrl: string;
    featuredImage?: string;
    featuredImageAltText?: string;
    featuredImageWidth?: number;
    featuredImageHeight?: number;
    title: string;
    topicNames?: string[];
  };
  headingAndTextHeadingLevel: HeadingLevelType;
  headingStyleVariant: HeadingStyleVariant;
  cardStyleVariant: CardVariantType;
  gatedContentIds?: string[];
  additionalClassArray?: string[];
}

// Components

interface TagListProps {
  tags: string[];
}

const CardTagContainer = createComponent('div');

const TagList = ({ tags }: TagListProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <CardTagContainer className={swm('hs-elevate-card--blog__tag-container')}>
      {tags.map((tag: string, index: number) => (
        <TagComponent key={index}>
          <SanitizedContent content={tag} />
        </TagComponent>
      ))}
    </CardTagContainer>
  );
};

// Functions to generate CSS variables

function generateColorCssVars(cardStyleVariant: string): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: {
      textColor: 'var(--hsElevate--card--variant1__textColor)',
      iconBackgroundColor: 'var(--hsElevate--card--variant1__iconBackgroundColor)',
    },
    card_variant_2: {
      textColor: 'var(--hsElevate--card--variant2__textColor)',
      iconBackgroundColor: 'var(--hsElevate--card--variant2__iconBackgroundColor)',
    },
    card_variant_3: {
      textColor: 'var(--hsElevate--card--variant3__textColor)',
      iconBackgroundColor: 'var(--hsElevate--card--variant3__iconBackgroundColor)',
    },
    card_variant_4: {
      textColor: 'var(--hsElevate--card--variant4__textColor)',
      iconBackgroundColor: 'var(--hsElevate--card--variant4__iconBackgroundColor)',
    },
  };

  return {
    '--hsElevate--blogCard__textColor': iconColorsMap[cardStyleVariant].textColor,
    '--hsElevate--blogCardIcon__backgroundColor': iconColorsMap[cardStyleVariant].iconBackgroundColor,
  };
}

const CardWrapper = createComponent('div');
const ImageContainer = createComponent('div');
const Image = createComponent('img');
const CardContentContainer = createComponent('div');
const CardHeadingContainer = createComponent('div');
const CardLink = createComponent('a');
const GateIconImage = createComponent('div');

function BlogCardComponent(props: BlogCardComponentProps) {
  const { post, headingAndTextHeadingLevel, headingStyleVariant, cardStyleVariant = 'card_variant_2', gatedContentIds = [], additionalClassArray } = props;

  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  const cssVarsMap = { ...generateColorCssVars(cardStyleVariant) };

  return (
    <CardWrapper style={cssVarsMap} className={cx(swm('hs-elevate-card--blog__card-wrapper'), additionalClasses)}>
      <Card key={post.id} cardOrientation="column" cardStyleVariant={cardStyleVariant} additionalClassArray={[swm('hs-elevate-card--blog')]}>
        <CardLink className={swm('hs-elevate-card--blog__link')} href={post.absoluteUrl}>
          <ImageContainer className={swm('hs-elevate-card--blog__image-container')}>
            {post.featuredImage && (
              <Image
                className={swm('hs-elevate-card--blog__image')}
                src={post.featuredImage}
                alt={post.featuredImageAltText || ''}
                width={post.featuredImageWidth}
                height={post.featuredImageHeight}
              />
            )}
          </ImageContainer>
          <CardContentContainer className={swm('hs-elevate-card--blog__content-container')}>
            <TagList tags={post?.topicNames || []} />
            <CardHeadingContainer>
              <HeadingComponent
                heading={post.title}
                headingLevel={headingAndTextHeadingLevel}
                headingStyleVariant={headingStyleVariant}
                additionalClassArray={[swm('hs-elevate-card--blog__heading')]}
              />
              {gatedContentIds.includes(post.id) && (
                <GateIconImage className={swm('hs-elevate-card--blog__gate-icon')} aria-label="Gated content" role="presentation" />
              )}
            </CardHeadingContainer>
          </CardContentContainer>
        </CardLink>
      </Card>
    </CardWrapper>
  );
}

export default BlogCardComponent;

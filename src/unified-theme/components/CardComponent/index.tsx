import styles from './card.module.css';
import cx, { staticWithModule } from '../utils/classnames.js';
import { CardStyleFieldLibraryType } from '../fieldLibrary/CardStyle/types.js';
import { getCardVariantClassName } from '../utils/card-variants.js';

const swm = staticWithModule(styles);

// Types

type CardProps = CardStyleFieldLibraryType & {
  additionalClassArray?: string[];
  inlineStyles?: React.CSSProperties;
  cardOrientation: 'row' | 'column';
  children?: React.ReactNode;
};

// Default content if no children is passed

const DefaultContent = () => (
  <>
    <h3>Card heading</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum id nisl commodo blandit. Nam at sagittis erat, a lobortis nibh.</p>
  </>
);

// Component

export const Card = (props: CardProps) => {
  const { cardStyleVariant, additionalClassArray, inlineStyles, cardOrientation, children } = props;
  const cardClassName = getCardVariantClassName({ cardVariant: cardStyleVariant, fallbackCardVariant: 'card_variant_1' });
  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';
  const cardClasses = cx(swm('hs-elevate-card'), cardClassName, additionalClasses, {
    [styles['hs-elevate-card--row']]: cardOrientation === 'row',
    [styles['hs-elevate-card--column']]: cardOrientation === 'column',
  });

  return (
    <article className={cardClasses} style={inlineStyles}>
      {children || <DefaultContent />}
    </article>
  );
};

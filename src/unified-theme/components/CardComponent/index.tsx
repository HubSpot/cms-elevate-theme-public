import { styled } from 'styled-components'
import StyledComponentsRegistry from '../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { CardStyleFieldLibraryType } from '../fieldLibrary/CardStyle/types.js';

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

function getCardVariantClassName(cardVariant) {
  const cardVariants = {
    card_variant_1: 'hs-elevate-card--variant-1',
    card_variant_2: 'hs-elevate-card--variant-2',
    card_variant_3: 'hs-elevate-card--variant-3',
    card_variant_4: 'hs-elevate-card--variant-4',
  };

  return cardVariants[cardVariant] || 'hs-elevate-card--variant-1';
}

type StyledCardProps = {
  $cardOrientation: 'row' | 'column';
};

const StyledCard = styled.article<StyledCardProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: var(--hsElevate--spacing--32, 32px);

  @media (min-width: 1000px) {
    flex-direction: ${(props) => props.$cardOrientation};
  }
`;

// Component

export const Card = (props: CardProps) => {
  const { cardStyleVariant, additionalClassArray, inlineStyles, cardOrientation, children } = props;
  const cardClassName = getCardVariantClassName(cardStyleVariant);

  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';
  return (
    <StyledComponentsRegistry>
      <StyledCard className={`${cardClassName} ${additionalClasses}`} style={inlineStyles} $cardOrientation={cardOrientation}>
        {children || <DefaultContent />}
      </StyledCard>
    </StyledComponentsRegistry>
  );
};

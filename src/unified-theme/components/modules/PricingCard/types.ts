import type { TextFieldType, BooleanFieldType } from '@hubspot/cms-components/fields';
import type { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import type { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';
import type { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import type { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import type { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';

export type PricingCardSummaryProps = {
  groupSummary: HeadingAndTextFieldLibraryType & {
    description: TextFieldType['default'];
    price: TextFieldType['default'];
    timePeriod: TextFieldType['default'];
  };
};

export type PricingCardFeaturesProps = {
  groupPlanFeatures: HeadingAndTextFieldLibraryType & {
    featuresTitle: TextFieldType['default'];
    groupFeatures: Array<{
      feature: TextFieldType['default'];
    }>;
  };
};

export type PricingCardButtonContentProps = {
  groupButton: ButtonContentType & {
    showButton: BooleanFieldType['default'];
  };
};

export type PricingCardContentProps = PricingCardSummaryProps & PricingCardFeaturesProps & PricingCardButtonContentProps;

export type GroupStyle = {
  groupCard: CardStyleFieldLibraryType;
  groupSummary: HeadingStyleFieldLibraryType;
  groupPlanFeatures: HeadingStyleFieldLibraryType;
  groupButton: ButtonStyleFieldLibraryType;
};

export type PricingCardProps = {
  moduleName?: string;
  groupPricingCards: PricingCardContentProps[];
  groupStyle: GroupStyle;
};

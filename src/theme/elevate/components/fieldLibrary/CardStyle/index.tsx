import { ChoiceField, AdvancedVisibility } from '@hubspot/cms-components/fields';
import { CardVariantType, CardVariantThemeFieldPathType } from '../../types/fields.js';
import { getCardVariantChoices } from '../../utils/card-variants.js';

type CardStyle = {
  cardStyleDefault: CardVariantType;
  cardStyleVisibility?: AdvancedVisibility;
};

export default function CardStyle(props: CardStyle) {
  const { cardStyleDefault = 'primary', cardStyleVisibility = null } = props;

  const themeFieldPath: CardVariantThemeFieldPathType = 'group_elements.group_cards.card_variant_1';

  return (
    <ChoiceField
      label="Card style"
      name="cardStyleVariant"
      visibilityRules="ADVANCED"
      advancedVisibility={cardStyleVisibility}
      display="select"
      choices={getCardVariantChoices()}
      inlineHelpText='<a href="$theme_link">Edit</a>'
      links={[
        {
          type: 'THEME_EDITOR',
          name: 'theme_link',
          params: {
            theme_path: '@hubspot/elevate',
            theme_field_path: themeFieldPath,
          },
        },
      ]}
      required={true}
      default={cardStyleDefault}
    />
  );
}

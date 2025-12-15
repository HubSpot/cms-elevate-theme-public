import { TextFieldType, AlignmentFieldType, ColorFieldType, LogoFieldType, BooleanFieldType } from '@hubspot/cms-components/fields';
import { SizeOption, maxMenuDepth } from '../../MenuComponent/types.js';
import { MenuComponentProps } from '../../MenuComponent/types.js';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';

export type MenuDataType = {
  label: string;
  url: string;
  linkTarget?: string;
  children?: MenuDataType[];
};

interface GroupButton extends ButtonContentType {
  showButton: BooleanFieldType['default'];
}

type GroupLogo = {
  logo?: LogoFieldType['default'];
};

export type MenuModuleContentFields = {
  groupLogo: GroupLogo;
  groupButton: GroupButton;
};

type GroupMenuStyle = {
  menuColumnGap: SizeOption;
  menuItemPadding: SizeOption;
  menuItemVerticalGap: SizeOption;
  menuAlignment: AlignmentFieldType['default'];
  menuTextColor: ColorFieldType['default'];
  menuTextHoverColor: ColorFieldType['default'];
  menuAccentColor: ColorFieldType['default'];
  menuBackgroundColor: ColorFieldType['default'];
};

type MenuModuleStyles = {
  groupMenu: GroupMenuStyle;
  groupButton: ButtonStyleFieldLibraryType;
};

export interface MenuModulePropTypes extends MenuModuleContentFields {
  moduleName?: string;
  hublData: {
    navigation: {
      children: MenuDataType[];
    };
    companyName: string; // Fallback if no logo is present
    defaultLogo: LogoFieldType['default']; // Temporary until logoField is fixed
    logoLink: string;
    isInEditor: boolean;
  };
  maxDepth: maxMenuDepth;
  defaultContent: {
    logoLinkAriaText: string;
    languageSwitcherSelectText: string;
    placeholderTitle: string;
    placeholderDescription: string;
    logoPlaceholderTitle: string;
    logoPlaceholderDescription: string;
  };
  accessibility: {
    menuName: TextFieldType['default'];
  };
  styles: MenuModuleStyles;
}

export interface MobileMenuIslandProps extends MenuComponentProps, MenuModuleContentFields, ButtonStyleFieldLibraryType {
  moduleName?: string;
  menuBackgroundColor: string;
  menuAccentColor: string;
  menuTextColor: string;
  menuTextHoverColor: string;
  languageSwitcherSelectText: string;
  langSwitcherIconFieldPath: string;
}

import { AlignmentFieldType, TextFieldType, BooleanFieldType } from '@hubspot/cms-components/fields';
import { KeyboardEvent, FocusEvent, CSSProperties, Dispatch, SetStateAction } from 'react';
import { LinkStyleType } from '../types/fields.js';

export type FlowDirection = 'horizontal' | 'vertical';
export type FlowChoice = [FlowDirection, string];
export type SizeOption = 'none' | 'small' | 'medium' | 'large';
export type SizeChoice = [SizeOption, string];
export type maxMenuDepth = number;
export type MenuComponentProps = {
  flow: FlowDirection;
  menuDataArray: any[];
  maxDepth: maxMenuDepth;
  menuAlignment: AlignmentFieldType['default'];
  navigationAriaLabel: string | TextFieldType['default'];
  flyouts: boolean | BooleanFieldType['default'];
  topLevelMenuItemStyles?: CSSProperties;
  subMenuItemStyles?: CSSProperties;
  topLevelMenuItemClasses?: string;
  subMenuItemClasses?: string;
  isMobileMenu: boolean;
  triggeredMenuItems: string[];
  linkStyleVariant: LinkStyleType;
  setTriggeredMenuItems: (triggeredMenuItems: string[]) => void;
  mobileAnchorClickCallback?: (cb: () => void) => void;
  additionalClassArray?: string[];
};

export type MenuItemRefsType = {
  current?: HTMLUListElement[];
};

export type LinkRefsType = {
  current?: HTMLAnchorElement[];
};

export type visibleMenuItemsControllerType = {
  visibleMenuItems: string[];
  setVisibleMenuItems: Dispatch<SetStateAction<string[]>>;
};

export type MenuDataType = {
  label: string;
  url: string;
  linkTarget?: string;
  children?: MenuDataType[];
};

export type KeyboardEventCallback = (e: KeyboardEvent, currentElId: string) => void;

export type A11yControllerType = {
  handleFocus: (e: FocusEvent, key: string) => void;
  handleBlur: () => void;
  focusedItem: string;
  keyboardEventCallback: KeyboardEventCallback;
  menuItemRefs: MenuItemRefsType;
  linkRefs: LinkRefsType;
};

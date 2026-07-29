import { ModuleFields, MenuField, FieldGroup, ChoiceField, NumberField, AlignmentField, TextField } from '@hubspot/cms-components/fields';
import { SizeChoice } from '../../MenuComponent/types.js';
import LinkStyle from '../../fieldLibrary/LinkStyle/index.js';

const sizeOptions: SizeChoice[] = [
  ['none', 'None'],
  ['small', 'Small'],
  ['medium', 'Medium'],
  ['large', 'Large'],
];

export const fields = (
  <ModuleFields>
    <MenuField label="Menu" name="menu" default="default" />
    <NumberField
      label="Max menu depth"
      name="maxDepth"
      display="slider"
      min={1}
      max={3}
      helpText="Set the maximum number of menu levels to include. Must always include at least 1 level or else no menu would populate."
      default={3}
    />
    <TextField
      label="Accessible menu name"
      name="menuName"
      helpText='Set the aria-label on the nav element surrounding the menu. This provides additional context to those using screen readers to better understand the purpose of your menu. <a href="https://www.w3.org/WAI/tutorials/menus/structure/#label-menus">Learn more here</a>'
      default=""
    />
    <FieldGroup label="Styles" name="styles" tab="STYLE">
      <FieldGroup label="Menu" name="groupMenu" display="inline">
        <AlignmentField label="Menu alignment" name="menuAlignment" required={true} alignmentDirection="HORIZONTAL" default={{ horizontal_align: 'LEFT' }} />
        <ChoiceField
          label="Column gap"
          name="menuColumnGap"
          display="select"
          helpText="Changes the amount of space between top level menu items. You can also think as the space between each column in the horizontal menu."
          choices={sizeOptions}
          default="none"
          required={true}
        />
      </FieldGroup>
      <FieldGroup label="Menu items" name="groupMenuItems" display="inline">
        <ChoiceField
          label="Vertical gap"
          name="menuItemVerticalGap"
          display="select"
          helpText="Changes the amount of space between menu items. Increasing this value will create unclickable space/gaps between each menu item link."
          choices={sizeOptions}
          required={true}
          default="none"
        />
        <ChoiceField
          label="Padding"
          name="menuItemPadding"
          display="select"
          helpText="Changes the amount of padding surrounding the text of each menu item. Increasing this value will increase the clickable area of each menu item link."
          choices={sizeOptions}
          required={true}
          default="none"
        />
      </FieldGroup>
      <FieldGroup label="Links" name="groupLink" display="inline">
        <LinkStyle linkStyleDefault="primary_links" />
      </FieldGroup>
    </FieldGroup>
    <FieldGroup label="Placeholder text" name="groupPlaceholderText" locked={true}>
      <TextField label="Title" name="placeholderTitle" default="No menu selected" />
      <TextField
        label="Description"
        name="placeholderDescription"
        default="Select an existing menu from the sidebar, or create a new one by navigating to the Navigation Menus tool"
      />
    </FieldGroup>
  </ModuleFields>
);

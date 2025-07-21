import { IconFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import listIconSvg from '../FeatureList/assets/list.svg';
import { Icon } from '@hubspot/cms-components';
import styles from './list.module.css';
import { SectionVariantType } from '../../types/fields.js';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';
import { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';

const swm = staticWithModule(styles);

// Types

type ListProps = {
  listIcon: IconFieldType['default'];
  groupListItems: GroupListItems[];
  groupStyle: GroupStyle;
};

type GroupStyle = SectionStyleFieldLibraryType;

type GroupListItems = {
  groupListContent: {
    listItemContent: TextFieldType['default'];
  };
};

// Function to generate color CSS variables

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--list__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--list__accentColor': sectionColorsMap[sectionVariantField].accentColor,
    '--hsElevate--list__sectionBackgroundColor': sectionColorsMap[sectionVariantField].backgroundColor,
  };
}

// Components

const ListContainer = createComponent('ul');
const ListItem = createComponent('li');
const IconContainer = createComponent('span');

export const Component = (props: ListProps) => {
  const {
    listIcon,
    groupListItems,
    groupStyle: { sectionStyleVariant },
  } = props;

  const cssColorVars = { ...generateColorCssVars(sectionStyleVariant) };

  return (
    <ListContainer className={swm('hs-elevate-list-container')} style={cssColorVars}>
      {groupListItems.map((item, index) => {
        return (
          <ListItem className={swm('hs-elevate-list-container__item')} key={`${index} ${item.groupListContent.listItemContent}`}>
            {listIcon.name && (
              <IconContainer className={swm('hs-elevate-list-container__icon-container')}>
                <Icon className={swm('hs-elevate-list-container__icon')} fieldPath="listIcon" purpose="DECORATIVE" />
              </IconContainer>
            )}
            {item.groupListContent.listItemContent}
          </ListItem>
        );
      })}
    </ListContainer>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'List',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY', 'BLOG_LISTING', 'BLOG_POST'],
  icon: listIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/list',
  version: 0,
  themeModule: true,
};

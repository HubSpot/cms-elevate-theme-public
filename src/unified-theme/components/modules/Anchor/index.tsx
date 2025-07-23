import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import styles from './anchor.module.css';
import anchorIconSvg from './assets/anchor.svg';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';

const swm = staticWithModule(styles);

// Types

type AnchorProps = {
  anchor: TextFieldType['default'];
  hublData: {
    isInEditor: boolean;
  };
};

// Components

const Anchor = createComponent('span');
const AnchorVisual = createComponent('span');

export const Component = (props: AnchorProps) => {
  const { anchor, hublData } = props;

  const showAnchorVisual = hublData.isInEditor ? true : false;

  return (
    <Anchor className={swm('hs-elevate-anchor')} id={anchor}>
      {showAnchorVisual && <AnchorVisual className={swm('hs-elevate-anchor__visual')}></AnchorVisual>}
    </Anchor>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "isInEditor": is_in_editor,
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Anchor',
  content_types: ['SITE_PAGE', 'LANDING_PAGE'],
  icon: anchorIconSvg,
  categories: ['functionality'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/anchor',
  version: 0,
  themeModule: true,
};

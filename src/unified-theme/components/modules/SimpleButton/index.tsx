import Button from '../../componentLibrary/Button/index.js';
import { ModuleMeta } from '../../types/modules.js';

export const Component = (props) => {
  return <Button text={props.text} {...props} />;
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Simple button',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: '',
  categories: ['forms_and_buttons'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/simple_button',
  version: 0,
  themeModule: true,
};

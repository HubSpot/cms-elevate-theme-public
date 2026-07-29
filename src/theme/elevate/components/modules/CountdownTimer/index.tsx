import { ModuleMeta } from '../../types/modules.js';
import { Island } from '@hubspot/cms-components';
// @ts-expect-error -- ?island not typed
import CountdownTimerIsland from './islands/CountdownTimerIsland.js?island';
import { CountdownTimerProps } from './types.js';
import countdownTimerIconSvg from './assets/time.svg';

export const Component = (props: CountdownTimerProps) => {
  return <Island hydrateOn="load" module={CountdownTimerIsland} {...props} />;
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Countdown timer',
  content_types: ['SITE_PAGE', 'LANDING_PAGE'],
  icon: countdownTimerIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/countdown_timer',
  version: 0,
  themeModule: true,
};

import { useSharedIslandState } from '@hubspot/cms-components';
import ArrowComponent from '../../../MenuComponent/ArrowComponent.js';
import { LogoFieldType } from '@hubspot/cms-components/fields';
import styles from '../mobile-logo-back-button.module.css';
import cx, { staticWithModule } from '../../../utils/classnames.js';
import { createComponent } from '../../../utils/create-component.js';

const swm = staticWithModule(styles);

// Types

type MobileLogoBackButtonProps = {
  logoField: LogoFieldType['default'];
  companyName: string;
  logoLink: string;
  logoLinkAriaText: string;
};

// Components

const BackButtonContainer = createComponent('div');
const BackButton = createComponent('button');
const LogoImage = createComponent('img');
const CompanyNameFallback = createComponent('span');
const LogoLink = createComponent('a');
const LogoLinkScreenReader = createComponent('span');

export default function MobileLogoBackButton(props: MobileLogoBackButtonProps) {
  const {
    companyName,
    logoField: { src: logoSrc, alt: logoAlt, width: logoWidth, height: logoHeight, suppress_company_name },
    logoLink,
    logoLinkAriaText,
  } = props;
  const [triggeredMenuItems, setTriggeredMenuItems] = useSharedIslandState();
  const showBackButton = triggeredMenuItems.length > 0;
  const goBackOneLevel = () => {
    setTriggeredMenuItems(triggeredMenuItems.slice(0, -1));
  };
  const isFileTypeSvg = logoSrc ? logoSrc.endsWith('.svg') : false;

  const backButtonContainerClasses = cx(swm('hs-elevate-site-header__back-button-container'), {
    [styles['hs-elevate-site-header__back-button-container--show-back-button']]: showBackButton,
  });

  const logoImageClasses = cx(swm('hs-elevate-site-header__logo'), { [styles['hs-elevate-site-header__logo--is-svg']]: isFileTypeSvg });

  return (
    <BackButtonContainer className={backButtonContainerClasses}>
      {showBackButton && (
        <BackButton className={swm('hs-elevate-site-header__back-button')} onClick={goBackOneLevel}>
          <ArrowComponent additionalClassArray={['hs-elevate-site-header__back-button-icon']} />
          Back
        </BackButton>
      )}
      {logoSrc && (
        <LogoLink className={swm('hs-elevate-site-header__logo-link')} href={logoLink || '#'}>
          <LogoImage className={logoImageClasses} src={logoSrc} alt={logoAlt} loading="eager" width={logoWidth} height={logoHeight} />
          <LogoLinkScreenReader className={cx(styles['hs-elevate-site-header__logo-link-screen-reader'])}>{logoLinkAriaText}</LogoLinkScreenReader>
        </LogoLink>
      )}
      {!logoSrc && !suppress_company_name && <CompanyNameFallback className={swm('hs-elevate-site-header__company-name')}>{companyName}</CompanyNameFallback>}
    </BackButtonContainer>
  );
}

import { ButtonStyleType, StandardSizeType, ElementPositionType } from '../types/fields.js';
import styles from './button.module.css';
import cx, { staticWithModule } from '../utils/classnames.js';
import { Icon } from '@hubspot/cms-components';
import { CSSPropertiesMap } from '../types/components.js';

const swm = staticWithModule(styles);

// Types

type ButtonProps = {
  ariaLabel?: string;
  buttonStyle: ButtonStyleType;
  buttonSize: StandardSizeType;
  additionalClassArray?: string[];
  rel: string;
  href: string;
  target: string;
  children?: React.ReactNode;
  showIcon: boolean;
  iconFieldPath?: string;
  iconPosition?: ElementPositionType;
};

// Function to set the button class name

function getButtonClassName(buttonStyle: ButtonStyleType) {
  const buttonClassMap = {
    primary: 'hs-elevate-button--primary',
    secondary: 'hs-elevate-button--secondary',
    tertiary: 'hs-elevate-button--tertiary',
    accent: 'hs-elevate-button--accent',
  };

  return buttonClassMap[buttonStyle];
}

// Function to pull in corresponding CSS variables on component based on prop values

function generatePaddingCSSVars(buttonSize: StandardSizeType): CSSPropertiesMap {
  const paddingMap = {
    small: 'var(--hsElevate--spacing--12, 12px) var(--hsElevate--spacing--20, 20px)',
    medium: 'var(--hsElevate--spacing--16, 16px) var(--hsElevate--spacing--24, 24px)',
    large: 'var(--hsElevate--spacing--20, 20px) var(--hsElevate--spacing--32, 32px)',
  };

  return { '--hsElevate--button__padding': paddingMap[buttonSize] };
}

const DefaultContent = () => (
  <>
    <span>Default Button</span>
  </>
);

export const Button = (props: ButtonProps) => {
  const { ariaLabel, additionalClassArray, rel, href, target, buttonStyle, buttonSize, children, showIcon, iconFieldPath, iconPosition } = props;

  const cssVarsMap = {
    ...generatePaddingCSSVars(buttonSize),
  };

  const buttonClassName = getButtonClassName(buttonStyle);
  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';
  const iconClasses = cx(swm('hs-elevate-button__icon'), {
    [styles['hs-elevate-button__icon--left']]: iconPosition === 'left',
    [styles['hs-elevate-button__icon--right']]: iconPosition === 'right',
  });

  return (
    <a
      style={cssVarsMap}
      className={cx(swm('hs-elevate-button'), buttonClassName, additionalClasses)}
      target={target}
      href={href}
      rel={rel}
      aria-label={ariaLabel}
    >
      {iconFieldPath && showIcon && <Icon className={cx(iconClasses)} purpose="DECORATIVE" fieldPath={iconFieldPath} />}
      {children || <DefaultContent />}
    </a>
  );
};

import React from 'react';
import { BaseComponentProps } from '../types/index.js';
import { createCSSVariables } from '../utils/index.js';
import { TextFieldDefaults } from '@hubspot/cms-components/fields';
import styles from './index.module.css';
import { buttonVariantSystem } from './config.js';
import { ExtractVariantTypes } from '../utils/index.js';
import { CSSPropertiesMap } from '../../types/components.js';

// Extract variant props directly from the variant system - no manual exports needed
type ButtonVariantProps = ExtractVariantTypes<typeof buttonVariantSystem>;

export interface ButtonProps extends BaseComponentProps, ButtonVariantProps {
  text: typeof TextFieldDefaults;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  element?: 'button' | 'anchor';
  onClick?: () => void;
}

export const Button = ({
  text,
  disabled = false,
  loading = false,
  fullWidth = false,
  href,
  target,
  rel,
  type = 'button',
  element = 'anchor',
  onClick,
  variant,
  size = 'medium',
  ...restProps
}: ButtonProps) => {
  // Use the new variant system to resolve all props dynamically in one step
  const { resolvedProps, unknownProps } =
    buttonVariantSystem.resolveAllProps(restProps);

  // Generate CSS variables from resolved props
  const componentStyles: React.CSSProperties = {
    ...createCSSVariables(resolvedProps, 'button'),
    // Full width modifier
    ...(fullWidth && { '--hscl-button-width': '100%' }),
    // hsElevate padding variables
    ...generatePaddingCSSVars(size),
    // User-provided inlined styles (highest priority)
    ...resolvedProps.style,
  };

  const themeButton = `hs-elevate-button--${variant}`;

  const buttonClasses = [
    styles.button,
    themeButton,
    disabled && styles.disabled,
    loading && styles.loading,
    resolvedProps.className, // From variant or explicit prop
  ]
    .filter(Boolean)
    .join(' ');

  const commonProps = {
    className: buttonClasses,
    style: componentStyles,
    disabled: disabled || loading,
    'data-test-id': resolvedProps['data-test-id'],
    role: resolvedProps.role || 'button',
    'aria-label': resolvedProps['aria-label'],
    'aria-labelledby': resolvedProps['aria-labelledby'],
    'aria-describedby': resolvedProps['aria-describedby'],
    'aria-disabled': disabled || loading,
    // Pass through unknown props to DOM element (they might be valid HTML attributes)
    ...unknownProps,
  };

  function generatePaddingCSSVars(buttonSize: string): CSSPropertiesMap {
    const paddingMap = {
      small: 'var(--hsElevate--spacing--12, 12px) var(--hsElevate--spacing--20, 20px)',
      medium: 'var(--hsElevate--spacing--16, 16px) var(--hsElevate--spacing--24, 24px)',
      large: 'var(--hsElevate--spacing--20, 20px) var(--hsElevate--spacing--32, 32px)',
    };

    // Fallback to 'medium' if buttonSize is undefined or invalid
    const validSize = paddingMap[buttonSize] ? buttonSize : 'medium';
    return { '--hsElevate--button__padding': paddingMap[validSize] };
  }

  if (element === 'anchor') {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        tabIndex={0}
        onClick={onClick}
        style={componentStyles}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        <span className={loading ? styles.loadingText : undefined}>{text}</span>
      </a>
    );
  }

  return (
    <button {...commonProps} type={type} onClick={onClick}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={loading ? styles.loadingText : undefined}>{text}</span>
    </button>
  );
};

export default Button;

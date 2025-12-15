import { ModuleMeta } from '../../types/modules.js';
import { AlignmentFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import { StandardSizeType } from '../../types/fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import styles from './button.module.css';
import { Button } from '../../ButtonComponent/index.js';
import buttonIconSvg from './assets/button.svg';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { CSSPropertiesMap } from '../../types/components.js';

const swm = staticWithModule(styles);

// Types
enum LinkType {
  EXTERNAL = 'EXTERNAL',
  CONTENT = 'CONTENT',
  FILE = 'FILE',
  EMAIL_ADDRESS = 'EMAIL_ADDRESS',
  CALL_TO_ACTION = 'CALL_TO_ACTION',
  BLOG = 'BLOG',
  PAYMENT = 'PAYMENT',
}

type GroupAriaLabels = {
  ariaLabel_external: TextFieldType['default'];
  ariaLabel_content: TextFieldType['default'];
  ariaLabel_file: TextFieldType['default'];
  ariaLabel_email: TextFieldType['default'];
  ariaLabel_blog: TextFieldType['default'];
  ariaLabel_payment: TextFieldType['default'];
  ariaLabel_default: TextFieldType['default'];
};

type GroupStyle = ButtonStyleFieldLibraryType & {
  gap: StandardSizeType;
  alignment: AlignmentFieldType['default'];
};

// Button component
type ButtonProps = {
  moduleName?: string;
  groupButtons: ButtonContentType[];
  groupStyle: GroupStyle;
  groupAriaLabels: GroupAriaLabels;
  hublData: {
    renderedWithGrids: boolean;
  };
};

// Function to set the aria label based on the link type

function setAriaLabel(groupAriaLabels: GroupAriaLabels, linkType?: string) {
  switch (linkType) {
    case LinkType.EXTERNAL:
      return groupAriaLabels.ariaLabel_external;
    case LinkType.CONTENT:
      return groupAriaLabels.ariaLabel_content;
    case LinkType.FILE:
      return groupAriaLabels.ariaLabel_file;
    case LinkType.EMAIL_ADDRESS:
      return groupAriaLabels.ariaLabel_email;
    case LinkType.BLOG:
      return groupAriaLabels.ariaLabel_blog;
    case LinkType.PAYMENT:
      return groupAriaLabels.ariaLabel_payment;
    default:
      return groupAriaLabels.ariaLabel_default;
  }
}

// Functions to pull in corresponding CSS variables on component based on field values

function generateGapCssVars(gapField: StandardSizeType): CSSPropertiesMap {
  const gapMap = {
    small: 'var(--hsElevate--spacing--8, 8px)',
    medium: 'var(--hsElevate--spacing--16, 16px)',
    large: 'var(--hsElevate--spacing--24, 24px)',
  };

  return { '--hsElevate--buttons__gap': gapMap[gapField] };
}

function generateAlignmentCssVars(alignmentField: AlignmentFieldType['default']): CSSPropertiesMap {
  const alignment = getAlignmentFieldCss(alignmentField);
  return { '--hsElevate--buttons__alignment': alignment.justifyContent || 'flex-start' };
}

// Components

const ButtonWrapper = createComponent('div');
const ButtonContainer = createComponent('div');

export const Component = (props: ButtonProps) => {
  const {
    moduleName,
    groupButtons,
    groupStyle: { alignment, buttonStyleVariant, buttonStyleSize, gap },
    groupAriaLabels,
    hublData: { renderedWithGrids = false },
  } = props;

  const cssVarsMap = {
    ...generateGapCssVars(gap),
    ...generateAlignmentCssVars(alignment),
  };

  const layoutClass = (renderedWithGrids ?? false) ? 'hs-elevate-button-wrapper--grids' : 'hs-elevate-button-wrapper--bootstrap';

  return (
    <ButtonWrapper className={cx(swm('hs-elevate-button-wrapper'), styles[layoutClass])} style={cssVarsMap}>
      <ButtonContainer className={swm('hs-elevate-button-container')}>
        {groupButtons.map((button, index) => (
          <Button
            key={index}
            buttonStyle={buttonStyleVariant}
            buttonSize={buttonStyleSize}
            href={getLinkFieldHref(button.buttonContentLink)}
            rel={getLinkFieldRel(button.buttonContentLink)}
            ariaLabel={setAriaLabel(groupAriaLabels, button.buttonContentLink.url?.type)}
            target={getLinkFieldTarget(button.buttonContentLink)}
            showIcon={button.buttonContentShowIcon}
            iconFieldPath={`groupButtons[${index}].buttonContentIcon`}
            iconPosition={button.buttonContentIconPosition}
            additionalClassArray={['hs-elevate-button-container__button']}
            moduleName={moduleName}
            textFieldPath={`groupButtons[${index}].buttonContentText`}
          >
            {button.buttonContentText}
          </Button>
        ))}
      </ButtonContainer>
    </ButtonWrapper>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "renderedWithGrids": rendered_with_grids,
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Button',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: buttonIconSvg,
  categories: ['forms_and_buttons'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/button',
  version: 0,
  themeModule: true,
};

import { ModuleMeta } from '../../types/modules.js';
import { AlignmentFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import { StandardSizeType } from '../../types/fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { Button } from '../../ButtonComponent/index.js';
import buttonIconSvg from './assets/button.svg';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';

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
  groupButtons: ButtonContentType[];
  groupStyle: GroupStyle;
  groupAriaLabels: GroupAriaLabels;
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

type CSSPropertiesMap = { [key: string]: string };

function generateGapCssVars(gapField: StandardSizeType): CSSPropertiesMap {
  const gapMap = {
    small: 'var(--hsElevate--spacing--8, 8px)',
    medium: 'var(--hsElevate--spacing--16, 16px)',
    large: 'var(--hsElevate--spacing--24, 24px)',
  };

  return { '--hsElevate--buttons__gap': gapMap[gapField] };
}

type ButtonWrapperProps = {
  $alignment: AlignmentFieldType['default'];
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--hsElevate--buttons__gap);
  justify-content: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};

  @container (max-width: 400px) {
    flex-direction: column;

    // On mobile we want to default the buttons to be centered
    // On larger screens with smaller containers we want the buttons to
    // be aligned to the start of the container.
    @media (min-width: 500px) {
      align-items: ${props => getAlignmentFieldCss(props.$alignment).justifyContent};
    }
  }
`;

const ButtonContainer = styled.div`
  container-type: inline-size;
`;

export const Component = (props: ButtonProps) => {
  const {
    groupButtons,
    groupStyle: { alignment, buttonStyleVariant, buttonStyleSize, gap },
    groupAriaLabels,
  } = props;

  const cssVarsMap = {
    ...generateGapCssVars(gap),
  };

  return (
    <StyledComponentsRegistry>
      <ButtonContainer>
        <ButtonWrapper $alignment={alignment} style={cssVarsMap}>
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
            >
              {button.buttonContentText}
            </Button>
          ))}
        </ButtonWrapper>
      </ButtonContainer>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

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

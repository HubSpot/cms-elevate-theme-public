import { useId, type ReactNode } from 'react';
import { ModuleMeta } from '../../types/modules.js';
import { RichText } from '@hubspot/cms-components';
import { ImageFieldType, LinkFieldType, TextFieldType, BooleanFieldType, RichTextFieldType } from '@hubspot/cms-components/fields';
import { CardVariantType } from '../../types/fields.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { getCardVariantClassName } from '../../utils/card-variants.js';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { getDataHSToken } from '../../utils/inline-editing.js';
import mediaAndSummaryIconSvg from './assets/media-and-summary.svg';
import styles from './media-and-summary.module.css';

const swm = staticWithModule(styles);

type MediaAndSummaryProps = {
  moduleName?: string;
  group_logo: {
    customerLogo: ImageFieldType['default'];
  };
  group_summary: {
    industryLabel: TextFieldType['default'];
    industry: TextFieldType['default'];
    challengeLabel: TextFieldType['default'];
    challengeRichText: RichTextFieldType['default'];
    resultsLabel: TextFieldType['default'];
    resultsRichText: RichTextFieldType['default'];
    keyProductLabel: TextFieldType['default'];
    keyProduct: TextFieldType['default'];
  };
  group_link: {
    showWebsiteLink: BooleanFieldType['default'];
    linkText: TextFieldType['default'];
    websiteUrl: LinkFieldType['default'];
  };
  group_style: CardStyleFieldLibraryType;
};

const FeatureWrapper = createComponent('div');
const Feature = createComponent('div');
const ImageContainer = createComponent('div');
const FeatureImage = createComponent('img');
const ContentContainer = createComponent('div');
const DetailsList = createComponent('div');
const DetailRow = createComponent('div');
const LabelContainer = createComponent('div');
const LabelText = createComponent('p');
const ValueContainer = createComponent('div');
const ValueParagraph = createComponent('p');
const LinkContainer = createComponent('div');
const LinkAnchor = createComponent('a');

function DetailGroup({ label, children }: { label: string; children: ReactNode }) {
  const labelId = useId();
  return (
    <DetailRow className="hs-elevate-details" role="group" aria-labelledby={labelId}>
      <LabelContainer className="hs-elevate-details_label-container">
        <LabelText id={labelId} className="hs-elevate-details__label">
          {label}
        </LabelText>
      </LabelContainer>
      <ValueContainer className="hs-elevate-details__value-container">{children}</ValueContainer>
    </DetailRow>
  );
}

function FeatureChevron() {
  return (
    <svg className="cs-feature__chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
      <path
        className="cs-feature__chevron-path"
        d="M9.79399 4.10043L2.99372 0.190703C2.16891 -0.283516 1.10262 0.178478 0.961074 1.00594C0.940125 1.12841 0.968466 1.2526 1.01359 1.36836L2.42912 5.00004L1.01359 8.63172C0.968466 8.74748 0.940121 8.87169 0.961111 8.99414C1.10095 9.80995 2.14126 10.2741 2.96632 9.82472L9.76659 6.12076C10.6065 5.66331 10.6212 4.57602 9.79399 4.10043Z"
      />
    </svg>
  );
}

export const Component = (props: MediaAndSummaryProps) => {
  const {
    moduleName,
    group_logo: { customerLogo },
    group_summary: { industryLabel, industry, challengeLabel, resultsLabel, keyProductLabel, keyProduct },
    group_link: { showWebsiteLink, linkText, websiteUrl },
    group_style: { cardStyleVariant },
  } = props;

  const cardVariantClass = getCardVariantClassName({ cardVariant: cardStyleVariant as CardVariantType, fallbackCardVariant: 'card_variant_2' });
  const linkHref = getLinkFieldHref(websiteUrl);
  const showLink = showWebsiteLink && linkHref;

  return (
    <FeatureWrapper className={cx('cs-feature-wrapper', swm('moduleRoot'))}>
      <Feature className={cx('cs-feature', cardVariantClass)}>
        <ImageContainer className="cs-feature__image-container">
          {Boolean(customerLogo.src) && (
            <FeatureImage
              className={cx('cs-feature__image', swm('featureImage'))}
              src={customerLogo.src}
              alt={customerLogo.alt || 'Featured image'}
              width={customerLogo.width}
              height={customerLogo.height}
              loading={customerLogo.loading !== 'disabled' ? customerLogo.loading : 'eager'}
              data-hs-token={getDataHSToken(moduleName, 'group_logo.customerLogo')}
            />
          )}
        </ImageContainer>
        <ContentContainer className="cs-feature__content-container">
          <DetailsList className="cs-feature__details">
            <DetailGroup label={industryLabel}>
              <ValueParagraph className="hs-elevate-details__value" data-hs-token={getDataHSToken(moduleName, 'group_summary.industry')}>
                {industry}
              </ValueParagraph>
            </DetailGroup>
            <DetailGroup label={challengeLabel}>
              <RichText
                fieldPath="group_summary.challengeRichText"
                className={cx('hs-elevate-details__value', swm('detailRichText'))}
                data-hs-token={getDataHSToken(moduleName, 'group_summary.challengeRichText')}
              />
            </DetailGroup>
            <DetailGroup label={resultsLabel}>
              <RichText
                fieldPath="group_summary.resultsRichText"
                className={cx('hs-elevate-details__value', swm('detailRichText'))}
                data-hs-token={getDataHSToken(moduleName, 'group_summary.resultsRichText')}
              />
            </DetailGroup>
            <DetailGroup label={keyProductLabel}>
              <ValueParagraph className="hs-elevate-details__value" data-hs-token={getDataHSToken(moduleName, 'group_summary.keyProduct')}>
                {keyProduct}
              </ValueParagraph>
            </DetailGroup>
          </DetailsList>
          {showLink && (
            <LinkContainer className="cs-feature__link-container">
              <LinkAnchor
                className="cs-feature__link"
                href={linkHref}
                rel={getLinkFieldRel(websiteUrl)}
                target={getLinkFieldTarget(websiteUrl)}
                data-hs-token={getDataHSToken(moduleName, 'group_link.websiteUrl')}
              >
                <span data-hs-token={getDataHSToken(moduleName, 'group_link.linkText')}>{linkText}</span>
                <FeatureChevron />
              </LinkAnchor>
            </LinkContainer>
          )}
        </ContentContainer>
      </Feature>
    </FeatureWrapper>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Media and summary',
  content_types: ['BLOG_POST'],
  icon: mediaAndSummaryIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/media_and_summary',
  version: 0,
  themeModule: true,
};

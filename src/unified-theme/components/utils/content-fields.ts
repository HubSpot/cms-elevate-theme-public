import { LinkFieldType } from '@hubspot/cms-components/fields';

// Links

export function getLinkFieldHref(fieldValue: LinkFieldType['default']) {
  if (!fieldValue || !fieldValue.url) {
    return;
  }

  const linkHref = fieldValue.url.href;
  const linkType = fieldValue.url.type;

  const hrefMap = {
    EMAIL_ADDRESS: `mailto:${linkHref}`,
    PAYMENT: `${linkHref}?referrer=CMS_MODULE_NEWTAB`,
  };

  return hrefMap[linkType] || linkHref;
}

export function getLinkFieldRel(fieldValue: LinkFieldType['default']) {
  const relValues = [];

  if (fieldValue.open_in_new_tab) {
    relValues.push('noopener', 'noreferrer');
  }
  if (fieldValue.no_follow) {
    relValues.push('nofollow');
  }
  return relValues.join(' ');
}
export function getLinkFieldTarget(fieldValue: LinkFieldType['default']): string {
  if (!fieldValue) {
    return '';
  }

  return fieldValue.open_in_new_tab ? '_blank' : '';
}

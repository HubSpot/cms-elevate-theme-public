import { AlignmentFieldType } from '@hubspot/cms-components/fields';

// Alignment

export function getAlignmentFieldCss(fieldValue: AlignmentFieldType['default']): { justifyContent: string; alignItems: string } {
  if (!fieldValue) return { justifyContent: null, alignItems: null };

  let horizontalAlign = null;
  let verticalAlign = null;

  if ('horizontal_align' in fieldValue) {
    switch (fieldValue.horizontal_align) {
      case 'LEFT':
        horizontalAlign = 'flex-start';
        break;
      case 'CENTER':
        horizontalAlign = 'center';
        break;
      case 'RIGHT':
        horizontalAlign = 'flex-end';
        break;
    }
  }

  if ('vertical_align' in fieldValue) {
    switch (fieldValue.vertical_align) {
      case 'TOP':
        verticalAlign = 'start';
        break;
      case 'MIDDLE':
        verticalAlign = 'center';
        break;
      case 'BOTTOM':
        verticalAlign = 'end';
        break;
    }
  }

  return {
    alignItems: verticalAlign,
    justifyContent: horizontalAlign,
  };
}

// Borders

export function getBorderFieldCss(borderStyle = {}) {
  const { style = 'solid', width = {}, color = '' } = borderStyle.top || {};

  const borderSize = width.value ? `${width.value}${width.units}` : '';

  return width.value ? `${borderSize} ${style} ${color}` : '';
}

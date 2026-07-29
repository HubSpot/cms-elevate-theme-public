import {
  TextFieldType,
  LinkFieldType,
  BooleanFieldType,
  IconFieldType,
} from '@hubspot/cms-components/fields';

export type ButtonContentType = {
  buttonContentText: TextFieldType['default'];
  buttonContentLink: LinkFieldType['default'];
  buttonContentShowIcon: BooleanFieldType['default'];
  buttonContentIcon?: IconFieldType['default'];
  buttonContentIconPosition?: 'left' | 'right';
};

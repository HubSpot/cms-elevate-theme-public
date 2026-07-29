import { DateTimeFieldType, NumberFieldType, ColorFieldType, TextFieldType } from '@hubspot/cms-components/fields';

export type CounterStyles = {
  fill?: 'filled' | 'no_fill';
  borderThickness?: NumberFieldType['default'];
  fillColor?: ColorFieldType['default'];
  borderColor?: ColorFieldType['default'];
  textColor?: ColorFieldType['default'];
};

export type CounterLabelsStyles = {
  textColor?: ColorFieldType['default'];
};

export type GroupStyle = {
  counter: CounterStyles;
  counterLabels: CounterLabelsStyles;
};

export type EndDate = DateTimeFieldType['default'];

export type CountdownTimerProps = {
  endDate: DateTimeFieldType['default'];
  groupStyle: GroupStyle;
  groupPlaceholderText: {
    days: TextFieldType['default'];
    hours: TextFieldType['default'];
    minutes: TextFieldType['default'];
    seconds: TextFieldType['default'];
    completedMessage: TextFieldType['default'];
  };
};

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

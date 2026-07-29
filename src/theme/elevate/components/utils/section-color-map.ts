import { SectionVariantType } from '../types/fields.js';

export type SectionColorConfig = {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  linkColor: string;
  textDecoration: string;
  textDecorationColor: string;
  linkHoverColor: string;
  linkHoverTextDecoration: string;
  linkHoverTextDecorationColor: string;
  blockquoteTextColor: string;
  blockquoteBackgroundColor: string;
  blockquoteAccentColor: string;
};

export type SectionColorsMap = Record<SectionVariantType, SectionColorConfig>;

export const sectionColorsMap: SectionColorsMap = {
  section_variant_1: {
    backgroundColor: 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    textColor: 'var(--hsElevate--section--lightSection--1__textColor)',
    accentColor: 'var(--hsElevate--section--lightSection--1__accentColor)',
    linkColor: 'var(--hsElevate--section--lightSection--1--link__fontColor)',
    textDecoration: 'var(--hsElevate--section--lightSection--1--link__textDecoration)',
    textDecorationColor: 'var(--hsElevate--section--lightSection--1--link__textDecorationColor)',
    linkHoverColor: 'var(--hsElevate--section--lightSection--1--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsElevate--section--lightSection--1--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsElevate--section--lightSection--1--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsElevate--section--lightSection--1--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsElevate--section--lightSection--1--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsElevate--section--lightSection--1--blockquote__accentColor)',
  },
  section_variant_2: {
    backgroundColor: 'var(--hsElevate--section--lightSection--2__backgroundColor)',
    textColor: 'var(--hsElevate--section--lightSection--2__textColor)',
    accentColor: 'var(--hsElevate--section--lightSection--2__accentColor)',
    linkColor: 'var(--hsElevate--section--lightSection--2--link__fontColor)',
    textDecoration: 'var(--hsElevate--section--lightSection--2--link__textDecoration)',
    textDecorationColor: 'var(--hsElevate--section--lightSection--2--link__textDecorationColor)',
    linkHoverColor: 'var(--hsElevate--section--lightSection--2--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsElevate--section--lightSection--2--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsElevate--section--lightSection--2--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsElevate--section--lightSection--2--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsElevate--section--lightSection--2--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsElevate--section--lightSection--2--blockquote__accentColor)',
  },
  section_variant_3: {
    backgroundColor: 'var(--hsElevate--section--lightSection--3__backgroundColor)',
    textColor: 'var(--hsElevate--section--lightSection--3__textColor)',
    accentColor: 'var(--hsElevate--section--lightSection--3__accentColor)',
    linkColor: 'var(--hsElevate--section--lightSection--3--link__fontColor)',
    textDecoration: 'var(--hsElevate--section--lightSection--3--link__textDecoration)',
    textDecorationColor: 'var(--hsElevate--section--lightSection--3--link__textDecorationColor)',
    linkHoverColor: 'var(--hsElevate--section--lightSection--3--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsElevate--section--lightSection--3--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsElevate--section--lightSection--3--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsElevate--section--lightSection--3--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsElevate--section--lightSection--3--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsElevate--section--lightSection--3--blockquote__accentColor)',
  },
  section_variant_4: {
    backgroundColor: 'var(--hsElevate--section--darkSection--1__backgroundColor)',
    textColor: 'var(--hsElevate--section--darkSection--1__textColor)',
    accentColor: 'var(--hsElevate--section--darkSection--1__accentColor)',
    linkColor: 'var(--hsElevate--section--darkSection--1--link__fontColor)',
    textDecoration: 'var(--hsElevate--section--darkSection--1--link__textDecoration)',
    textDecorationColor: 'var(--hsElevate--section--darkSection--1--link__textDecorationColor)',
    linkHoverColor: 'var(--hsElevate--section--darkSection--1--link__hover--fontColor)',
    linkHoverTextDecoration: 'var(--hsElevate--section--darkSection--1--link__hover--textDecoration)',
    linkHoverTextDecorationColor: 'var(--hsElevate--section--darkSection--1--link__hover--textDecorationColor)',
    blockquoteTextColor: 'var(--hsElevate--section--darkSection--1--blockquote__textColor)',
    blockquoteBackgroundColor: 'var(--hsElevate--section--darkSection--1--blockquote__backgroundColor)',
    blockquoteAccentColor: 'var(--hsElevate--section--darkSection--1--blockquote__accentColor)',
  },
};

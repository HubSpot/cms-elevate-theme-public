const themeGroupSectionsPath = 'theme.group_foundation.group_colors.group_more_settings.group_sections';

export const themeLightSectionAccentColors = [
  `${themeGroupSectionsPath}.group_light_section_1.group_fonts.accent_color.color`,
  `${themeGroupSectionsPath}.group_light_section_2.group_fonts.accent_color.color`,
  `${themeGroupSectionsPath}.group_light_section_3.group_fonts.accent_color.color`,
];
export const themeDarkSectionAccentColors = [`${themeGroupSectionsPath}.group_dark_section_1.group_fonts.accent_color.color`];

export const themeLightSectionTextColors = [
  `${themeGroupSectionsPath}.group_light_section_1.group_fonts.text_color.color`,
  `${themeGroupSectionsPath}.group_light_section_2.group_fonts.text_color.color`,
  `${themeGroupSectionsPath}.group_light_section_3.group_fonts.text_color.color`,
];
export const themeDarkSectionTextColors = [`${themeGroupSectionsPath}.group_dark_section_1.group_fonts.text_color.color`];

export const themeLightSectionBackgroundColors = [
  `${themeGroupSectionsPath}.group_light_section_1.group_section.background_color.color`,
  `${themeGroupSectionsPath}.group_light_section_2.group_section.background_color.color`,
  `${themeGroupSectionsPath}.group_light_section_3.group_section.background_color.color`,
];
export const themeDarkSectionBackgroundColors = [`${themeGroupSectionsPath}.group_dark_section_1.group_section.background_color.color`];

type LimitedColorDefaultsType = {
  themeColors: string[];
  themeSectionTextColors: string[];
  themeSectionBackgroundColors: string[];
};

export const limitedColorDefaults: LimitedColorDefaultsType = {
  themeColors: [...themeLightSectionAccentColors, ...themeDarkSectionAccentColors],
  themeSectionTextColors: [...themeLightSectionTextColors, ...themeDarkSectionTextColors],
  themeSectionBackgroundColors: [...themeLightSectionBackgroundColors, ...themeDarkSectionBackgroundColors],
};

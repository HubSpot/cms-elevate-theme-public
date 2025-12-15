import { RichTextField, AdvancedVisibility, RichTextFieldType } from '@hubspot/cms-components/fields';

type RichTextProps = {
  label?: string;
  richTextDefault?: RichTextFieldType['default'];
  richTextVisibility?: AdvancedVisibility;
  featureSet?: 'extended' | 'text';
};

/*
 * Sets a couple of different preset rich text feature sets that can be used across modules
 * To see the full list of available features, check out https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields/rich-text-editor
 */

const textFeatureSet = [
  'block',
  'alignment',
  'indents',
  'lists',
  'standard_emphasis',
  'advanced_emphasis',
  'link',
  'personalize',
  'nonbreaking_space',
  'source_code',
  'visual_blocks',
] as RichTextFieldType['enabledFeatures'];

const extendedFeatureSet = [
  'block',
  'alignment',
  'indents',
  'lists',
  'standard_emphasis',
  'advanced_emphasis',
  'link',
  'image',
  'emoji',
  'personalize',
  'cta',
  'embed',
  'video',
  'charmap',
  'anchor',
  'nonbreaking_space',
  'source_code',
  'visual_blocks',
] as RichTextFieldType['enabledFeatures'];

export default function RichTextContent(props: RichTextProps) {
  const {
    label = 'Content',
    richTextDefault = '<h2>Something Powerful</h2><h3>Tell The Reader More</h3><p>The heading and subheading tells us what you\'re <a href="#">offering</a>, and the form heading closes the deal. Over here you can explain why your offer is so great it\'s worth filling out a form for.</p><p>Remember:</p><ul><li>Bullets are great</li><li>For spelling out <a href="#">benefits</a> and</li><li>Turning visitors into leads.</li></ul>',
    richTextVisibility = null,
    featureSet,
  } = props;

  return (
    <RichTextField
      label={label}
      name="richTextContentHTML"
      visibilityRules="ADVANCED"
      advancedVisibility={richTextVisibility}
      enabledFeatures={featureSet === 'text' ? textFeatureSet : extendedFeatureSet}
      default={richTextDefault}
      inlineEditable={true}
    />
  );
}

import { ModuleFields, TextField, RepeatedFieldGroup, LinkField, BooleanField, IconField, FieldGroup } from '@hubspot/cms-components/fields';
import StyleFields from './styleFields.js';

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      label="Social links"
      name="groupSocialLinks"
      occurrence={{
        min: 1,
        max: 10,
        default: 5,
      }}
      default={[
        {
          groupLink: {
            link: {
              url: {
                type: 'EXTERNAL',
                href: 'https://www.facebook.com',
              },
            },
          },
          groupIcon: {
            customizeIcon: false,
            customIcon: { name: 'link' },
          },
        },
        {
          groupLink: {
            link: {
              url: {
                type: 'EXTERNAL',
                href: 'https://www.twitter.com',
              },
            },
          },
          groupIcon: {
            customizeIcon: false,
            customIcon: { name: 'link' },
          },
        },
        {
          groupLink: {
            link: {
              url: {
                type: 'EXTERNAL',
                href: 'https://www.instagram.com',
              },
            },
          },
          groupIcon: {
            customizeIcon: false,
            customIcon: { name: 'link' },
          },
        },
        {
          groupLink: {
            link: {
              url: {
                type: 'EXTERNAL',
                href: 'https://www.linkedin.com',
              },
            },
          },
          groupIcon: {
            customizeIcon: false,
            customIcon: { name: 'link' },
          },
        },
        {
          groupLink: {
            link: {
              url: {
                href: 'email@email.com',
                type: 'EMAIL_ADDRESS',
              },
            },
          },
          groupIcon: {
            customizeIcon: false,
            customIcon: { name: 'link' },
          },
        },
      ]}
    >
      <FieldGroup label="Link" name="groupLink" display="inline">
        <LinkField
          label="Link"
          name="link"
          placeholder="Link"
          default={{
            url: {
              type: 'EXTERNAL',
              href: '',
            },
            open_in_new_tab: true,
          }}
        />
      </FieldGroup>
      <FieldGroup label="Icon" name="groupIcon" display="inline">
        <BooleanField label="Customize icon" name="customizeIcon" default={false} />
        <IconField
          label="Icon"
          name="customIcon"
          iconSet="fontawesome-6.4.2"
          visibility={{
            controlling_field: 'groupSocialLinks.groupIcon.customizeIcon',
            controlling_value_regex: 'true',
          }}
          default={{ name: 'link' }}
        />
      </FieldGroup>
    </RepeatedFieldGroup>
    <FieldGroup label="Default icons" name="groupDefaultIcons" locked={true}>
      <IconField label="Facebook Icon" name="facebook" iconSet="fontawesome-6.4.2" default={{ name: 'Facebook F' }} />
      <IconField label="Instagram Icon" name="instagram" iconSet="fontawesome-6.4.2" default={{ name: 'instagram' }} />
      <IconField label="X Icon" name="twitter" iconSet="fontawesome-6.4.2" default={{ name: 'X Twitter' }} />
      <IconField label="Email Icon" name="envelope" iconSet="fontawesome-6.4.2" default={{ name: 'envelope' }} />
      <IconField label="Link Icon" name="link" iconSet="fontawesome-6.4.2" default={{ name: 'link' }} />
      <IconField label="Youtube Icon" name="youtube" iconSet="fontawesome-6.4.2" default={{ name: 'youtube' }} />
      <IconField label="LinkedIn Icon" name="linkedin" iconSet="fontawesome-6.4.2" default={{ name: 'linkedin' }} />
      <IconField label="GitHub Icon" name="github" iconSet="fontawesome-6.4.2" default={{ name: 'github' }} />
      <IconField label="Spotify Icon" name="spotify" iconSet="fontawesome-6.4.2" default={{ name: 'spotify' }} />
      <IconField label="Soundcloud Icon" name="soundcloud" iconSet="fontawesome-6.4.2" default={{ name: 'soundcloud' }} />
      <IconField label="Yelp Icon" name="yelp" iconSet="fontawesome-6.4.2" default={{ name: 'yelp' }} />
      <IconField label="Pinterest Icon" name="pinterest" iconSet="fontawesome-6.4.2" default={{ name: 'pinterest' }} />
      <IconField label="TikTok Icon" name="tiktok" iconSet="fontawesome-6.4.2" default={{ name: 'tiktok' }} />
    </FieldGroup>
    <FieldGroup label="Default text" name="groupDefaultText" locked={true}>
      <TextField label="Website link aria label" name="websiteLinkAriaLabel" default="Visit our website" />
      <TextField label="X link aria label" name="twitterLinkAriaLabel" default="Follow us on X" />
      <TextField label="YouTube link aria label" name="youtubeLinkAriaLabel" default="Subscribe to us on YouTube" />
      <TextField label="Facebook link aria label" name="facebookLinkAriaLabel" default="Follow us on Facebook" />
      <TextField label="LinkedIn link aria label" name="linkedinLinkAriaLabel" default="Follow us on LinkedIn" />
      <TextField label="Instagram link aria label" name="instagramLinkAriaLabel" default="Follow us on Instagram" />
      <TextField label="GitHub link aria label" name="githubLinkAriaLabel" default="Follow us on GitHub" />
      <TextField label="Spotify link aria label" name="spotifyLinkAriaLabel" default="Follow us on Spotify" />
      <TextField label="Soundcloud link aria label" name="soundcloudLinkAriaLabel" default="Follow us on Soundcloud" />
      <TextField label="Yelp link aria label" name="yelpLinkAriaLabel" default="Follow us on Yelp" />
      <TextField label="Pinterest link aria label" name="pinterestLinkAriaLabel" default="Follow us on Pinterest" />
      <TextField label="TikTok link aria label" name="tiktokLinkAriaLabel" default="Follow us on TikTok" />
      <TextField label="Email link aria label" name="emailLinkAriaLabel" default="Email us" />
    </FieldGroup>
    <StyleFields />
  </ModuleFields>
);

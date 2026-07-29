import { ModuleFields, TextField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField
      label="Anchor"
      name="anchor"
      helpText='Enter a name for your anchor. It must begin with a letter and contain only letters, numbers, hyphens, underscores, colons and periods. You can separate multiple words in an anchor with hyphens. <a href="https://knowledge.hubspot.com/website-pages/insert-and-manage-anchor-links">Learn more</a>'
      validationRegex="^[A-Za-z]+[\w\-\:\.]*$"
      validationErrorMessage="Anchor must start with a letter and can only contain letters, numbers, hyphens, underscores, colons, and periods."
      default=""
    />
  </ModuleFields>
);

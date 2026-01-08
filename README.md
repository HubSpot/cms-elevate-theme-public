# Elevate - HubSpot Default CMS Theme

Elevate is HubSpot's default CMS theme, designed to provide a modern, flexible, and customizable foundation for building beautiful websites on the HubSpot CMS platform.

Because this theme is built using HubSpot's project based theme framework, it does not appear inside of the design manager. This repository is designed to give developers access to the source code so that they can easily customize the theme to suit their needs, use it to create a child theme of Elevate, or just use it as a reference for building custom themes.

## Overview

Elevate is built with modern development practices in mind, utilizing:
- Vite for fast and efficient builds
- PostCSS for modern CSS processing
- HubL templating for dynamic content
- TypeScript support
- Built-in testing with Vitest

## Prerequisites

- [Node.js](https://nodejs.org) (version specified in `.node-version`)
- [HubSpot CLI](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli)

## Getting Started

1. Clone this repository:
   ```bash
   git clone [repository-url]
   cd cms-elevate-theme-public
   ```

2. Install dependencies:
   ```bash
   npm run npm-install:all
   # or
   yarn yarn-install:all
   ```

3. Configure your HubSpot CLI (if not installed already)
   ```bash
   hs init
   ```

4. Build and upload the theme to your portal:
   ```bash
   npm run build-upload
   # or
   yarn build-upload
   ```

5. Start the development server:
   ```bash
   npm run npm-start
   # or
   yarn yarn-start
   ```

## Available Scripts

- `build` - Builds the theme for production
- `upload` - Uploads the theme to HubSpot
- `build-upload` - Builds and uploads the theme in one command
- `test` - Runs the test suite
- `npm-install:all` - Installs dependencies for all workspaces
- `yarn-install:all` - Installs dependencies using Yarn for all workspaces
- `npm-start` - Starts the development server using npm
- `yarn-start` - Starts the development server using yarn

## Project Structure

```
├── src/
│   └── unified-theme/         # Main theme directory
│       ├── _locales/          # Localization files
│       ├── assets/            # Theme assets
│       ├── components/        # React components
│       │   ├── modules/       # Theme modules (e.g., Accordion, Button, Card)
│       │   │   └── ImageAndText/  # Example module structure
│       │   │       ├── index.tsx
│       │   │       ├── types.ts
│       │   │       └── styles.ts
│       │   ├── fieldLibrary/  # Field components for module fields
│       │   ├── utils/         # Utility helpers
│       │   ├── types/         # TypeScript type definitions
│       │   └── ButtonComponent/  # Example shared component consumed by modules
│       │       └── index.tsx
│       ├── helpers/          # Helper functions and utilities
│       ├── images/           # Theme images
│       ├── sections/         # Theme sections
│       ├── templates/        # Theme templates
│       ├── fields.json       # Theme settings
│       ├── theme.json        # Theme configuration
│       ├── package.json      # Theme-specific dependencies
│       └── tsconfig.json     # TypeScript configuration
├── build/                    # Build configuration
├── vite.config.ts            # Vite configuration
├── package.json              # Project dependencies
└── hsproject.json            # HubSpot project configuration
```

## Development

The theme uses HubSpot's local development server for real-time preview of your changes. When you run `npm run start` or `yarn yarn-start`, you can view your changes at the local development URL provided by the CLI.

## Creating a child theme based on Elevate

Building a child theme is a great way to extend the functionality of Elevate without having to modify the core theme files. This can be done in either design manager or using the unified theme framework.

### Design manager

1. Create a new theme in design manager
2. Select "Use blank theme as starting point"
3. Modify the theme.json file to include `"extends": "@hubspot/elevate"`
4. Copy Elevate's theme fields.json file (`src/unified-theme/fields.json`) to the root of your new theme.
5. Add your custom code to the `src/unified-theme` directory.

### Unified theme framework

1. From your cli run `npx @hubspot/create-cms-theme`
2. Follow the prompts to create a blank unified theme project
3. Modify the theme.json file to include `"extends": "@hubspot/elevate"`
4. Copy Elevate'stheme fields.json file (`src/unified-theme/fields.json`) to the root of your new theme.

### Grids functionality

The grids system and related HubL tags are currently only available within the default Elevate theme and can't be used in child themes or custom implementations. Throughout the theme templates, you'll see conditional logic like `{% if grids %} ... {% else %} ...`. When using Elevate as a starting point for development, reference the code within the `{% else %}` blocks, as the grids-specific code will not function outside of the default theme.

### Inline editing functionality

The inline editing functionality, which may be seen on certain components and modules within the theme via the `data-hs-token` HTML attribute or the `inlineEditable` field property, are only available within the default Elevate theme and can't be used in child themes or custom implementations. 

### Notable items

In order to override parent theme files from a child theme, you need to ensure that the file you are trying to override exists at the same path in both themes and has the same file name.


## Contributing

Note that this theme is maintained by HubSpot. It is configured to sync with an internal repository and was built so that developers can have access to the source code as the theme itself is not available in the design manager.

No PR's will be accepted / merged in here. Instead, we recommend creating issues.

Open issues if you notice any bugs or have feature requests (unofficially supported) -- however, if you notice impactful bugs, the recommended way to get them fixed is to open a ticket with HubSpot's support team (officially supported).

## License

This project is licensed under the Apache-2.0 License - see the LICENSE file for details.

## Support

Learn more about HubSpot CMS:
- [Building with React on Hubspot](https://developers.hubspot.com/docs/guides/cms/react/overview)
- Check the [HubSpot Developer Documentation](https://developers.hubspot.com/)
- Visit the [HubSpot Community](https://community.hubspot.com/)

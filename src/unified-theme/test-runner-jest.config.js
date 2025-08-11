import { getJestConfig } from '@storybook/test-runner';

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  // Jest test timeout - optimized since navigation timeout is handled in prepare function
  testTimeout: 60000, // 1 minute - reasonable for individual story tests

  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
      launchOptions: {
        // Use default browser launch timeout
        // Use system Chrome in CI environments (Blazar)
        executablePath: process.env.CI ? '/usr/bin/google-chrome' : undefined,
        // Ensure headless mode
        headless: true,
        // Additional Chrome args for stability in CI
        args: [
          '--no-sandbox',
          '--disable-extensions',
          '--disable-gpu',
        ],
      },
    },
  },
};

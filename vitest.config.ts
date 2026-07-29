import { defineConfig } from 'vitest/config';
import { default as react } from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      react: path.resolve('./src/theme/elevate/node_modules/react'),
    },
  },
});

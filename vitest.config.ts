import { defineConfig } from 'vitest/config';

// Tests cover core logic only: validation, status rules, and image checks.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});

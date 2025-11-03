import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // WHAT: Enable global test functions (describe, it, expect)
    // WHY: No need to import them in every test file
    // HOW: Makes them available globally like Jest
    globals: true,

    // WHAT: Set test environment to Node.js
    // WHY: Backend runs in Node, not browser
    // HOW: Uses node environment for testing
    environment: 'node',

    // WHAT: Setup files to run before tests
    // WHY: Initialize test database, mocks, etc.
    // HOW: Runs this file before each test suite
    // setupFiles: ['./src/test/setup.ts'],

    // WHAT: Coverage configuration
    // WHY: Track which code is tested
    // HOW: Generates coverage reports
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/test/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },

    // WHAT: Test file patterns
    // WHY: Tell Vitest where to find tests
    // HOW: Matches files ending in .test.ts or .spec.ts
    include: ['src/**/*.{test,spec}.ts'],

    // WHAT: Timeout for tests
    // WHY: Prevent hanging tests
    // HOW: Fail after 10 seconds
    testTimeout: 10000,
  },
})

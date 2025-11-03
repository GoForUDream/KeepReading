import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  test: {
    // WHAT: Enable global test functions
    // WHY: No need to import describe, it, expect
    globals: true,

    // WHAT: Use happy-dom environment
    // WHY: React needs browser-like environment (DOM, window, document)
    // HOW: Simulates browser in Node.js
    // NOTE: happy-dom is faster and has better ESM support than jsdom
    environment: 'happy-dom',

    // WHAT: Setup file for React Testing Library
    // WHY: Configure matchers like toBeInTheDocument()
    // HOW: Runs before all tests
    setupFiles: ['./src/test/setup.ts'],

    // WHAT: Coverage configuration
    // WHY: See which components are tested
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/test/',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
    },

    // WHAT: Test file patterns
    // WHY: Find all test files
    // HOW: Matches .test.tsx and .spec.tsx files
    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    // WHAT: CSS handling
    // WHY: Tests don't need actual CSS processing
    // HOW: Mock CSS imports for faster tests
    css: true,
  },

  // WHAT: Path resolution
  // WHY: Match your app's import aliases
  // HOW: Same as Vite config
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

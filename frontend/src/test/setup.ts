// WHAT: Test setup file for React Testing Library
// WHY: Configures custom matchers and cleanup
// HOW: Runs before all tests

import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// WHAT: Mock window.matchMedia
// WHY: Ant Design components (like Row/Col) use matchMedia
// HOW: Provide a minimal implementation for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
})

// WHAT: Cleanup after each test
// WHY: Prevents tests from affecting each other
// HOW: Unmounts React components after each test
afterEach(() => {
  cleanup()
})

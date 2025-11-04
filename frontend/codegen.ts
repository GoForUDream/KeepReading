/**
 * WHAT: GraphQL Code Generator configuration
 * WHY: Auto-generate TypeScript types and React hooks from GraphQL schema
 * HOW: Reads schema from backend and operations from .graphql files
 *
 * GENERATES:
 * - TypeScript types for all GraphQL types
 * - Typed React hooks (useLoginMutation, useBooksQuery, etc.)
 * - All in src/generated/graphql.ts
 */

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // WHAT: Path to GraphQL schema
  // WHY: Source of truth for all types
  schema: '../backend/schema.graphql',

  // WHAT: GraphQL operation files (.graphql)
  // WHY: Define queries/mutations that will have hooks generated
  documents: ['src/**/*.graphql'],

  // WHAT: Generate TypeScript + React hooks
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        // WHAT: React hooks configuration
        withHooks: true,
        withHOC: false,
        withComponent: false,

        // WHAT: Better type names
        avoidOptionals: false,
        maybeValue: 'T | null',

        // WHAT: Custom scalars
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },

  // WHAT: Watch mode for development
  watch: false,

  // WHAT: Show verbose errors
  verbose: true,
};

export default config;

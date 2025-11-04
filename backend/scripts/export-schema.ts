/**
 * WHAT: Export GraphQL schema to .graphql file
 * WHY: Frontend codegen needs schema file for type generation
 * HOW: Reads typeDefs and writes to schema.graphql
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { typeDefs } from '../src/graphql/schema.js';
import { print } from 'graphql';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schemaPath = join(__dirname, '..', 'schema.graphql');

// Convert DocumentNode to string and write to file
const schemaString = print(typeDefs);
writeFileSync(schemaPath, schemaString, 'utf-8');

console.log('✅ GraphQL schema exported to:', schemaPath);

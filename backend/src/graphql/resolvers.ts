import { booksResolvers } from '../features/books/index.js';
import { categoriesResolvers } from '../features/categories/index.js';
import { authResolvers } from '../features/auth/index.js';
import { usersResolvers } from '../features/users/index.js';

/**
 * WHAT: Combined GraphQL Resolvers
 * WHY: Merges all feature resolvers into a single resolver object
 * HOW: Spreads Query and Mutation resolvers from each feature
 *
 * ARCHITECTURE:
 * - Feature-based organization (books, categories, auth, users)
 * - Each feature has its own service layer and resolvers
 * - This file acts as the aggregation point
 *
 * BENEFITS:
 * - Scalability: Easy to add new features
 * - Maintainability: Each feature is self-contained
 * - Testability: Features can be tested in isolation
 */

export const resolvers = {
  Query: {
    ...booksResolvers.Query,
    ...categoriesResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...booksResolvers.Mutation,
    ...categoriesResolvers.Mutation,
    ...authResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};

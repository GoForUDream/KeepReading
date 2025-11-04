import { categoriesService } from './categories.service';

/**
 * WHAT: Categories GraphQL Resolvers
 * WHY: Handles GraphQL queries and mutations for categories
 * HOW: Delegates business logic to CategoriesService
 *
 * BENEFITS:
 * - Thin resolvers (just input validation and delegation)
 * - Easy to test
 * - Clear separation of concerns
 */

export const categoriesResolvers = {
  Query: {
    /**
     * Get all categories
     */
    categories: async () => {
      return await categoriesService.getAllCategories();
    },

    /**
     * Get a single category by ID
     */
    category: async (_: unknown, { id }: { id: string }) => {
      return await categoriesService.getCategoryById(id);
    },
  },

  Mutation: {
    /**
     * Create a new category
     */
    createCategory: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      return await categoriesService.createCategory(input as Parameters<typeof categoriesService.createCategory>[0]);
    },

    /**
     * Delete a category
     */
    deleteCategory: async (_: unknown, { id }: { id: string }) => {
      return await categoriesService.deleteCategory(id);
    },
  },
};

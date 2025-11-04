import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * WHAT: Categories Service - Business Logic Layer
 * WHY: Separates business logic from GraphQL resolvers
 * HOW: Uses Prisma to interact with database
 *
 * BENEFITS:
 * - Reusable across different layers (GraphQL, REST, etc.)
 * - Easier to test (mock the service, not Prisma)
 * - Single Responsibility Principle
 * - Business logic is centralized
 */

export class CategoriesService {
  /**
   * Get all categories ordered by name
   */
  async getAllCategories() {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Get a single category by ID
   */
  async getCategoryById(id: string) {
    return await prisma.category.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new category
   */
  async createCategory(input: {
    name: string;
    slug: string;
  }) {
    return await prisma.category.create({
      data: input,
    });
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: string) {
    return await prisma.category.delete({
      where: { id },
    });
  }
}

// Export singleton instance
export const categoriesService = new CategoriesService();

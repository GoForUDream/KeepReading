import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * WHAT: Books Service - Business Logic Layer
 * WHY: Separates business logic from GraphQL resolvers
 * HOW: Uses Prisma to interact with database
 *
 * BENEFITS:
 * - Reusable across different layers (GraphQL, REST, etc.)
 * - Easier to test (mock the service, not Prisma)
 * - Single Responsibility Principle
 * - Business logic is centralized
 */

export class BooksService {
  /**
   * Get all books ordered by creation date
   */
  async getAllBooks() {
    return await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single book by ID
   */
  async getBookById(id: string) {
    return await prisma.book.findUnique({
      where: { id },
    });
  }

  /**
   * Get a single book by ISBN
   */
  async getBookByIsbn(isbn: string) {
    return await prisma.book.findUnique({
      where: { isbn },
    });
  }

  /**
   * Create a new book
   */
  async createBook(input: {
    title: string;
    author: string;
    description?: string;
    price: number;
    isbn: string;
    coverImage?: string;
    category: string;
    stock?: number;
    published: string;
  }) {
    return await prisma.book.create({
      data: {
        ...input,
        published: new Date(input.published),
      },
    });
  }

  /**
   * Update an existing book
   */
  async updateBook(id: string, input: Record<string, unknown>) {
    const data: Record<string, unknown> = { ...input };

    if (input.published) {
      data.published = new Date(input.published as string);
    }

    return await prisma.book.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a book
   */
  async deleteBook(id: string) {
    return await prisma.book.delete({
      where: { id },
    });
  }
}

// Export singleton instance
export const booksService = new BooksService();

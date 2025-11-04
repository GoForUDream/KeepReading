import { booksService } from './books.service';

/**
 * WHAT: Books GraphQL Resolvers
 * WHY: Handles GraphQL queries and mutations for books
 * HOW: Delegates business logic to BooksService
 *
 * BENEFITS:
 * - Thin resolvers (just input validation and delegation)
 * - Easy to test
 * - Clear separation of concerns
 */

export const booksResolvers = {
  Query: {
    /**
     * Get all books
     */
    books: async () => {
      return await booksService.getAllBooks();
    },

    /**
     * Get a single book by ID
     */
    book: async (_: unknown, { id }: { id: string }) => {
      return await booksService.getBookById(id);
    },

    /**
     * Get a single book by ISBN
     */
    bookByIsbn: async (_: unknown, { isbn }: { isbn: string }) => {
      return await booksService.getBookByIsbn(isbn);
    },
  },

  Mutation: {
    /**
     * Create a new book
     */
    createBook: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      return await booksService.createBook(input as Parameters<typeof booksService.createBook>[0]);
    },

    /**
     * Update an existing book
     */
    updateBook: async (_: unknown, { id, input }: { id: string; input: Record<string, unknown> }) => {
      return await booksService.updateBook(id, input);
    },

    /**
     * Delete a book
     */
    deleteBook: async (_: unknown, { id }: { id: string }) => {
      return await booksService.deleteBook(id);
    },
  },
};

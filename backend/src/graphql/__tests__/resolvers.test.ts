import { describe, it, expect, beforeEach, vi } from 'vitest'

// WHAT: Mock Prisma Client BEFORE imports
// WHY: Need to mock before the module is imported
// HOW: Define mock methods then use in class
vi.mock('@prisma/client', () => {
  const mockBook = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }

  const mockCategory = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  }

  const mockCustomer = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  }

  return {
    PrismaClient: class {
      book = mockBook
      category = mockCategory
      customer = mockCustomer
    },
  }
})

// WHAT: Import after mocking
// WHY: Ensures mock is in place
import { resolvers } from '../resolvers'
import { PrismaClient } from '@prisma/client'

// WHAT: Get reference to mocked Prisma instance
// WHY: Need to access mock methods in tests
const prisma = new PrismaClient()
const mockPrismaClient = prisma as unknown as {
  book: {
    findMany: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
    create: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
  category: {
    findMany: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
    create: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
  customer: {
    findMany: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
    create: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
}

describe('GraphQL Resolvers', () => {
  beforeEach(() => {
    // WHAT: Clear all mocks before each test
    // WHY: Prevents test interference
    // HOW: Reset mock call history
    vi.clearAllMocks()
  })

  describe('Query: books', () => {
    it('should return all books ordered by createdAt desc', async () => {
      // WHAT: Mock data to return
      const mockBooks = [
        {
          id: '1',
          title: 'Test Book 1',
          author: 'Author 1',
          price: 29.99,
          isbn: '1234567890',
          category: 'Fiction',
          stock: 10,
          published: new Date('2024-01-01'),
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
        {
          id: '2',
          title: 'Test Book 2',
          author: 'Author 2',
          price: 39.99,
          isbn: '0987654321',
          category: 'Non-Fiction',
          stock: 5,
          published: new Date('2024-01-01'),
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ]

      // WHAT: Set up mock to return our data
      // WHY: Control what Prisma returns
      mockPrismaClient.book.findMany.mockResolvedValue(mockBooks)

      // WHAT: Call the resolver
      const result = await resolvers.Query.books()

      // WHAT: Verify the results
      expect(result).toEqual(mockBooks)
      expect(mockPrismaClient.book.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      })
      expect(mockPrismaClient.book.findMany).toHaveBeenCalledTimes(1)
    })

    it('should return empty array when no books exist', async () => {
      mockPrismaClient.book.findMany.mockResolvedValue([])

      const result = await resolvers.Query.books()

      expect(result).toEqual([])
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('Query: book', () => {
    it('should return a single book by id', async () => {
      const mockBook = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        price: 29.99,
        isbn: '1234567890',
        category: 'Fiction',
        stock: 10,
        published: new Date('2024-01-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrismaClient.book.findUnique.mockResolvedValue(mockBook)

      const result = await resolvers.Query.book(null, { id: '1' })

      expect(result).toEqual(mockBook)
      expect(mockPrismaClient.book.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      })
    })

    it('should return null when book not found', async () => {
      mockPrismaClient.book.findUnique.mockResolvedValue(null)

      const result = await resolvers.Query.book(null, { id: 'nonexistent' })

      expect(result).toBeNull()
    })
  })

  describe('Mutation: createBook', () => {
    it('should create a new book', async () => {
      const input = {
        title: 'New Book',
        author: 'New Author',
        price: 49.99,
        isbn: '1111111111',
        category: 'Technology',
        stock: 15,
        published: '2024-01-15',
      }

      const mockCreatedBook = {
        id: '3',
        ...input,
        published: new Date(input.published),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrismaClient.book.create.mockResolvedValue(mockCreatedBook)

      const result = await resolvers.Mutation.createBook(null, { input })

      expect(result).toEqual(mockCreatedBook)
      expect(mockPrismaClient.book.create).toHaveBeenCalledWith({
        data: {
          ...input,
          published: new Date(input.published),
        },
      })
    })
  })

  describe('Mutation: updateBook', () => {
    it('should update an existing book', async () => {
      const id = '1'
      const input = {
        title: 'Updated Title',
        price: 59.99,
      }

      const mockUpdatedBook = {
        id,
        title: 'Updated Title',
        author: 'Original Author',
        price: 59.99,
        isbn: '1234567890',
        category: 'Fiction',
        stock: 10,
        published: new Date('2024-01-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrismaClient.book.update.mockResolvedValue(mockUpdatedBook)

      const result = await resolvers.Mutation.updateBook(null, { id, input })

      expect(result).toEqual(mockUpdatedBook)
      expect(mockPrismaClient.book.update).toHaveBeenCalledWith({
        where: { id },
        data: input,
      })
    })
  })

  describe('Mutation: deleteBook', () => {
    it('should delete a book', async () => {
      const id = '1'
      const mockDeletedBook = {
        id,
        title: 'Deleted Book',
        author: 'Author',
        price: 29.99,
        isbn: '1234567890',
        category: 'Fiction',
        stock: 0,
        published: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrismaClient.book.delete.mockResolvedValue(mockDeletedBook)

      const result = await resolvers.Mutation.deleteBook(null, { id })

      expect(result).toEqual(mockDeletedBook)
      expect(mockPrismaClient.book.delete).toHaveBeenCalledWith({
        where: { id },
      })
    })
  })

  describe('Query: categories', () => {
    it('should return all categories ordered by name', async () => {
      const mockCategories = [
        { id: '1', name: 'Fiction', slug: 'fiction', createdAt: new Date(), updatedAt: new Date() },
        { id: '2', name: 'Non-Fiction', slug: 'non-fiction', createdAt: new Date(), updatedAt: new Date() },
      ]

      mockPrismaClient.category.findMany.mockResolvedValue(mockCategories)

      const result = await resolvers.Query.categories()

      expect(result).toEqual(mockCategories)
      expect(mockPrismaClient.category.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      })
    })
  })
})

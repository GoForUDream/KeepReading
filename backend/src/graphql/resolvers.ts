import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    books: async () => {
      return await prisma.book.findMany({
        orderBy: { createdAt: 'desc' },
      });
    },
    book: async (_: any, { id }: { id: string }) => {
      return await prisma.book.findUnique({
        where: { id },
      });
    },
    bookByIsbn: async (_: any, { isbn }: { isbn: string }) => {
      return await prisma.book.findUnique({
        where: { isbn },
      });
    },
    categories: async () => {
      return await prisma.category.findMany({
        orderBy: { name: 'asc' },
      });
    },
    category: async (_: any, { id }: { id: string }) => {
      return await prisma.category.findUnique({
        where: { id },
      });
    },
    customers: async () => {
      return await prisma.customer.findMany({
        orderBy: { createdAt: 'desc' },
      });
    },
    customer: async (_: any, { id }: { id: string }) => {
      return await prisma.customer.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    createBook: async (_: any, { input }: { input: any }) => {
      return await prisma.book.create({
        data: {
          ...input,
          published: new Date(input.published),
        },
      });
    },
    updateBook: async (_: any, { id, input }: { id: string; input: any }) => {
      const data: any = { ...input };
      if (input.published) {
        data.published = new Date(input.published);
      }
      return await prisma.book.update({
        where: { id },
        data,
      });
    },
    deleteBook: async (_: any, { id }: { id: string }) => {
      return await prisma.book.delete({
        where: { id },
      });
    },
    createCategory: async (_: any, { input }: { input: any }) => {
      return await prisma.category.create({
        data: input,
      });
    },
    deleteCategory: async (_: any, { id }: { id: string }) => {
      return await prisma.category.delete({
        where: { id },
      });
    },
    createCustomer: async (_: any, { input }: { input: any }) => {
      return await prisma.customer.create({
        data: input,
      });
    },
    deleteCustomer: async (_: any, { id }: { id: string }) => {
      return await prisma.customer.delete({
        where: { id },
      });
    },
  },
};

export { prisma };

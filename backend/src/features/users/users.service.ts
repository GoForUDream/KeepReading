import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * WHAT: Users Service - Business Logic Layer
 * WHY: Handles user profile management and queries
 * HOW: Uses Prisma to interact with database
 *
 * BENEFITS:
 * - Separates user management from authentication
 * - Reusable across different layers
 * - Easy to test
 * - Single Responsibility Principle
 */

export class UsersService {
  /**
   * Get all users (admin only)
   */
  async getAllUsers() {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        address1: true,
        address2: true,
        favoriteBookId: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
      },
    });
  }

  /**
   * Get a single user by ID
   */
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        address1: true,
        address2: true,
        favoriteBookId: true,
        favoriteBook: {
          select: {
            id: true,
            title: true,
            author: true,
            coverImage: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Get user's order history
   */
  async getUserOrders(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                author: true,
                coverImage: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    input: {
      fullName?: string;
      address1?: string;
      address2?: string;
      favoriteBookId?: string;
    }
  ) {
    return await prisma.user.update({
      where: { id: userId },
      data: input,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        address1: true,
        address2: true,
        favoriteBookId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Delete user account
   */
  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });
  }
}

// Export singleton instance
export const usersService = new UsersService();

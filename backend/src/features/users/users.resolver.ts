import { usersService } from './users.service';

/**
 * WHAT: Users GraphQL Resolvers
 * WHY: Handles GraphQL queries and mutations for user management
 * HOW: Delegates business logic to UsersService
 *
 * BENEFITS:
 * - Thin resolvers (just input validation and delegation)
 * - Easy to test
 * - Clear separation of concerns
 *
 * NOTE: In production, these resolvers should check authentication
 * and authorization before allowing access to user data
 */

export const usersResolvers = {
  Query: {
    /**
     * Get all users (should be admin only in production)
     */
    users: async () => {
      return await usersService.getAllUsers();
    },

    /**
     * Get a single user by ID
     */
    user: async (_: unknown, { id }: { id: string }) => {
      return await usersService.getUserById(id);
    },

    /**
     * Get current user's profile (requires authentication)
     */
    me: async (_: unknown, __: unknown, context: { userId?: string }) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }
      return await usersService.getUserById(context.userId);
    },

    /**
     * Get user's order history
     */
    myOrders: async (_: unknown, __: unknown, context: { userId?: string }) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }
      return await usersService.getUserOrders(context.userId);
    },
  },

  Mutation: {
    /**
     * Update user profile
     */
    updateProfile: async (
      _: unknown,
      { input }: { input: Record<string, unknown> },
      context: { userId?: string }
    ) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return await usersService.updateProfile(context.userId, input as Parameters<typeof usersService.updateProfile>[1]);
    },

    /**
     * Delete user account
     */
    deleteUser: async (_: unknown, { id }: { id: string }) => {
      return await usersService.deleteUser(id);
    },
  },
};

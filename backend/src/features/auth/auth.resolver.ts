import { authService } from './auth.service';
import { SignupInput, LoginInput } from './auth.types';

/**
 * WHAT: Authentication GraphQL Resolvers
 * WHY: Handles GraphQL mutations for signup and login
 * HOW: Delegates authentication logic to AuthService
 *
 * BENEFITS:
 * - Thin resolvers (just input validation and delegation)
 * - Easy to test
 * - Clear separation of concerns
 */

export const authResolvers = {
  Mutation: {
    /**
     * Sign up a new user
     */
    signup: async (_: unknown, { input }: { input: SignupInput }) => {
      // Basic validation
      if (!input.email || !input.password || !input.fullName) {
        throw new Error('Email, password, and full name are required');
      }

      if (input.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.email)) {
        throw new Error('Invalid email format');
      }

      return await authService.signup(input);
    },

    /**
     * Login existing user
     */
    login: async (_: unknown, { input }: { input: LoginInput }) => {
      // Basic validation
      if (!input.email || !input.password) {
        throw new Error('Email and password are required');
      }

      return await authService.login(input);
    },
  },
};

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignupInput, LoginInput, AuthResponse, JwtPayload } from './auth.types';

const prisma = new PrismaClient();

/**
 * WHAT: Authentication Service - Business Logic Layer
 * WHY: Handles user authentication, password hashing, and JWT generation
 * HOW: Uses bcrypt for password hashing and jsonwebtoken for token generation
 *
 * BENEFITS:
 * - Secure password storage with bcrypt
 * - Stateless authentication with JWT
 * - Centralized auth logic
 * - Easy to test and maintain
 */

export class AuthService {
  private readonly SALT_ROUNDS = 10;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  private readonly JWT_EXPIRES_IN = '7d';

  /**
   * Hash a plain text password
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compare plain text password with hashed password
   */
  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Generate JWT token for authenticated user
   */
  private generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  /**
   * Verify and decode JWT token
   */
  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, this.JWT_SECRET) as JwtPayload;
  }

  /**
   * Sign up a new user
   */
  async signup(input: SignupInput): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(input.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        fullName: input.fullName,
        role: 'USER', // Default role
      },
    });

    // Generate token
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  /**
   * Login existing user
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await this.comparePassword(input.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  /**
   * Get user by ID (for authentication middleware)
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
        createdAt: true,
        updatedAt: true,
        // Exclude password from response
      },
    });
  }
}

// Export singleton instance
export const authService = new AuthService();

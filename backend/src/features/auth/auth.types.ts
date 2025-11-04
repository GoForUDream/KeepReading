/**
 * WHAT: Authentication Type Definitions
 * WHY: Type safety for authentication operations
 * HOW: Defines interfaces for auth inputs and responses
 */

export interface SignupInput {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

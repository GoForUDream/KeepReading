/**
 * WHAT: useAuth hook
 * WHY: Easy access to auth context throughout the app
 * HOW: Consumes AuthContext
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { User, LoginInput, SignupInput } from '@/generated/graphql';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

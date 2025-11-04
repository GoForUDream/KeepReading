/**
 * WHAT: Zustand store for authentication
 * WHY: Centralized state management for auth data
 * HOW: Uses Zustand for simple and performant state management
 */

import { create } from 'zustand';
import type { User } from '@/generated/graphql';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, token: null }),
}));

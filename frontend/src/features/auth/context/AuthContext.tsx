/**
 * WHAT: Authentication Context Provider
 * WHY: Global auth state management
 * HOW: Provides user, token, and auth methods to entire app
 */

import { createContext, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { useLoginMutation, useSignupMutation, useMeLazyQuery, type User, type LoginInput, type SignupInput } from '@/generated/graphql';
import { useAuthStore } from '@/store/authStore';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'keep_reading_token';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, token, isLoading, setUser, setToken, setIsLoading, logout: clearAuth } = useAuthStore();

  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();
  const [fetchMe] = useMeLazyQuery({
    fetchPolicy: 'network-only', // Always fetch from network, not cache
    onCompleted: (data) => {
      console.log('[AuthContext] fetchMe onCompleted:', data);
      if (data.me) {
        setUser(data.me as User);
      } else {
        console.log('[AuthContext] No user data returned, clearing token');
        // Token is invalid, clear it
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('[AuthContext] fetchMe onError:', error.message, error);
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setIsLoading(false);
    },
  });

  // Load token from localStorage and fetch user data on mount
  useEffect(() => {
    console.log('[AuthContext] useEffect running - checking for stored token');
    const storedToken = localStorage.getItem(TOKEN_KEY);
    console.log('[AuthContext] Stored token:', storedToken ? 'EXISTS' : 'NOT FOUND');

    if (storedToken) {
      setToken(storedToken);
      console.log('[AuthContext] Calling fetchMe()...');
      // Fetch user data using the token
      fetchMe();
    } else {
      console.log('[AuthContext] No token found, setting isLoading to false');
      setIsLoading(false);
    }
  }, [fetchMe, setToken, setIsLoading]);

  const login = async (input: LoginInput) => {
    return new Promise<void>((resolve, reject) => {
      loginMutation({
        variables: { input },
        onCompleted: (data) => {
          if (data.login) {
            const { token: newToken, user: newUser } = data.login;

            // Save token to localStorage and state
            localStorage.setItem(TOKEN_KEY, newToken);
            setToken(newToken);
            setUser(newUser as User);

            message.success('Login successful!');
            resolve();
          }
        },
        onError: (error) => {
          message.error(error.message || 'Login failed');
          reject(error);
        },
      });
    });
  };

  const signup = async (input: SignupInput) => {
    return new Promise<void>((resolve, reject) => {
      signupMutation({
        variables: { input },
        onCompleted: (data) => {
          if (data.signup) {
            const { token: newToken, user: newUser } = data.signup;

            // Save token to localStorage and state
            localStorage.setItem(TOKEN_KEY, newToken);
            setToken(newToken);
            setUser(newUser as User);

            message.success('Account created successfully!');
            resolve();
          }
        },
        onError: (error) => {
          message.error(error.message || 'Signup failed');
          reject(error);
        },
      });
    });
  };

  const logout = () => {
    clearAuth();
    localStorage.removeItem(TOKEN_KEY);
    message.success('Logged out successfully');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

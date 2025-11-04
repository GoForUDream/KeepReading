/**
 * WHAT: Authentication Context Provider
 * WHY: Global auth state management
 * HOW: Provides user, token, and auth methods to entire app
 */

import { createContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { useLoginMutation, useSignupMutation, type User, type LoginInput, type SignupInput } from '@/generated/graphql';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'keep_reading_token';
const USER_KEY = 'keep_reading_user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (input: LoginInput) => {
    try {
      const { data } = await loginMutation({
        variables: { input },
      });

      if (data?.login) {
        const { token: newToken, user: newUser } = data.login;

        // Save to state
        setToken(newToken);
        setUser(newUser as User);

        // Save to localStorage
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));

        message.success('Login successful!');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      message.error(errorMessage);
      throw error;
    }
  };

  const signup = async (input: SignupInput) => {
    try {
      const { data } = await signupMutation({
        variables: { input },
      });

      if (data?.signup) {
        const { token: newToken, user: newUser } = data.signup;

        // Save to state
        setToken(newToken);
        setUser(newUser as User);

        // Save to localStorage
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));

        message.success('Account created successfully!');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      message.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    message.success('Logged out successfully');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

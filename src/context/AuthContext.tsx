import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, AuthState } from '@types/index';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  restoreToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restoreToken = async (): Promise<void> => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        const userData = JSON.parse(await SecureStore.getItemAsync('userData') || '{}');
        setUser(userData);
      }
    } catch (err) {
      console.error('Token restore error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreToken();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const mockUser: User = {
        id: '1',
        email,
        name: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUser(mockUser);
      await SecureStore.setItemAsync('authToken', 'mock-token');
      await SecureStore.setItemAsync('userData', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const mockUser: User = {
        id: '1',
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUser(mockUser);
      await SecureStore.setItemAsync('authToken', 'mock-token');
      await SecureStore.setItemAsync('userData', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      setUser(null);
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    restoreToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

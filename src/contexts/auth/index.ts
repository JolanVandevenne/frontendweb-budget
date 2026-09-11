import { createContext, useContext } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | undefined;
  error: Error | undefined;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const JWT_TOKEN_KEY = 'jwtToken';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

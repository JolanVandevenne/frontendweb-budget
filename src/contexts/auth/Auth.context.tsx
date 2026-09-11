import {
  useState,
} from 'react';
import useSWRMutation from 'swr/mutation';
import * as api from '../../api';
import useSWR from 'swr';
import { AuthContext } from '.';

export const JWT_TOKEN_KEY = 'jwtToken';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(JWT_TOKEN_KEY),
  );


  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSWR<AuthUser>(token ? 'users/me' : null, api.getById);

  const {
    trigger: doLogin,
    isMutating: loginLoading,
    error: loginError,
  } = useSWRMutation('sessions', api.post);

  const setSession = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem(JWT_TOKEN_KEY, newToken);
  };


  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token: newToken } = (await doLogin({ email, password })) as {
        token: string;
      };
      setSession(newToken);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const logout = () => {
    setToken(null);
    localStorage.removeItem(JWT_TOKEN_KEY);
  };


  const value = {
    token,
    user,
    error: loginError || userError,
    loading: loginLoading || userLoading,
    isAuthed: Boolean(token),
    ready: !userLoading,
    login,
    logout,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

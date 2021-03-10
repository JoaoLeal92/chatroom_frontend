import React, { createContext, useContext, useCallback, useState } from 'react';
import jwt_decode from 'jwt-decode';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  dateOfBirth: Date;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

interface JwtData {
  exp: number;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ChatPlan:token');
    const user = localStorage.getItem('@ChatPlan:user');

    if (token && user) {
      const jwt_decoded = jwt_decode<JwtData>(token);
      const expiration = new Date(jwt_decoded.exp * 1000).getTime();
      const currentTime = new Date().getTime();

      // Clears local storage if token is expired
      if (expiration < currentTime) {
        localStorage.clear();
        return {} as AuthState;
      }
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@ChatPlan:user', JSON.stringify(user));
    localStorage.setItem('@ChatPlan:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ChatPlan:user');
    localStorage.removeItem('@ChatPlan:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

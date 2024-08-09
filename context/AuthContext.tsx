import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    userEmail: string | null;
    userName: string | null;
    login: (token: string, email: string, name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const login = (token: string, email: string, name: string) => {
    setAccessToken(token);
    setUserEmail(email);
    setUserName(name);
  };

  const logout = () => {
    setAccessToken(null);
    setUserEmail(null);
    setUserName(null);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout, userEmail, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('alumni_connect_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('alumni_connect_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const me = await authService.getCurrentUser();
          setUser(me);
          localStorage.setItem('alumni_connect_user', JSON.stringify(me));
        } catch (err) {
          console.error("Token verification failed:", err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.accessToken);
    setUser(data.user);
    localStorage.setItem('alumni_connect_token', data.accessToken);
    localStorage.setItem('alumni_connect_user', JSON.stringify(data.user));
    return data.user;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setToken(data.accessToken);
    setUser(data.user);
    localStorage.setItem('alumni_connect_token', data.accessToken);
    localStorage.setItem('alumni_connect_user', JSON.stringify(data.user));
    return data.user;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('alumni_connect_token');
    localStorage.removeItem('alumni_connect_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        role: user?.role || null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

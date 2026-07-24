import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Global helper — clears stale auth from localStorage
const clearAuthStorage = () => {
  localStorage.removeItem('cloth_shop_user');
  localStorage.removeItem('cloth_shop_token');
};

// Shared authenticated fetch — handles 401 globally
export const authFetch = async (url, options = {}, logoutCb) => {
  const token = localStorage.getItem('cloth_shop_token');

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // Token is expired / user deleted → auto-logout
  if (res.status === 401) {
    clearAuthStorage();
    if (typeof logoutCb === 'function') logoutCb();
    throw new Error('Session expired. Please sign in again.');
  }

  return res;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On mount: validate stored token against the backend
  useEffect(() => {
    const validateSession = async () => {
      const savedUser = localStorage.getItem('cloth_shop_user');
      const token = localStorage.getItem('cloth_shop_token');

      if (!savedUser || !token) {
        setLoading(false);
        return;
      }

      try {
        // Quick profile check to confirm token is still valid
        const res = await fetch('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // Token invalid / user deleted — clear everything silently
          clearAuthStorage();
        } else if (res.ok) {
          setUser(JSON.parse(savedUser));
        }
      } catch {
        // Network issue — keep the cached user, don't force logout
        try { setUser(JSON.parse(savedUser)); } catch {}
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearAuthStorage();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try { data = await res.json(); } catch { throw new Error(`Server error ${res.status}`); }
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser(data);
      localStorage.setItem('cloth_shop_user', JSON.stringify(data));
      localStorage.setItem('cloth_shop_token', data.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (name, email, password, phone, role) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, role }),
      });

      let data;
      try { data = await res.json(); } catch { throw new Error(`Server error ${res.status}`); }
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setUser(data);
      localStorage.setItem('cloth_shop_user', JSON.stringify(data));
      localStorage.setItem('cloth_shop_token', data.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

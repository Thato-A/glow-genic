import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // optional: show errors in UI
  const [authError, setAuthError] = useState(null);

  // Load auth on startup
  useEffect(() => {
    const saved = localStorage.getItem("glowgenic-auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user || null);
      setToken(parsed.token || null);
    }
  }, []);

  const persist = (nextUser, nextToken) => {
    localStorage.setItem(
      "glowgenic-auth",
      JSON.stringify({ user: nextUser, token: nextToken })
    );
  };

  const login = async (email, password) => {
    setAuthError(null);

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Login failed");

    setUser(data.user);
    setToken(data.token);
    persist(data.user, data.token);
    return data.user;
  };

  const register = async (name, email, password) => {
    setAuthError(null);

    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Registration failed");

    setUser(data.user);
    setToken(data.token);
    persist(data.user, data.token);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("glowgenic-auth");
    setUser(null);
    setToken(null);
  };

  // helper for protected API calls
  const authFetch = (path, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(`${API_BASE}${path}`, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authError,
        setAuthError,
        login,
        register,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

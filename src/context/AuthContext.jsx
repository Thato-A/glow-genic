import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("glowgenic-user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    const fakeUser = { email };
    localStorage.setItem("glowgenic-user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const register = (email, password) => {
    const newUser = { email };
    localStorage.setItem("glowgenic-user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("glowgenic-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AdminProfile, ADMIN_PROFILES } from "../data/mockData";

interface AuthContextType {
  currentAdmin: AdminProfile | null;
  login: (role: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentAdmin: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

const SESSION_KEY = "eprihatin_admin_role";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const profile = ADMIN_PROFILES[stored];
        return profile ?? null;
      }
    } catch {
      // sessionStorage unavailable (e.g., private browsing restriction)
    }
    return null;
  });

  const login = (role: string) => {
    const profile = ADMIN_PROFILES[role];
    if (profile) {
      setCurrentAdmin(profile);
      try { sessionStorage.setItem(SESSION_KEY, role); } catch { /* ignore */ }
    }
  };

  const logout = () => {
    setCurrentAdmin(null);
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  };

  return (
    <AuthContext.Provider value={{ currentAdmin, login, logout, isLoggedIn: currentAdmin !== null }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile | null>(null);

  const login = (role: string) => {
    const profile = ADMIN_PROFILES[role];
    if (profile) setCurrentAdmin(profile);
  };

  const logout = () => setCurrentAdmin(null);

  return (
    <AuthContext.Provider value={{ currentAdmin, login, logout, isLoggedIn: currentAdmin !== null }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

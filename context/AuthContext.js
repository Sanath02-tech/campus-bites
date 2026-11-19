"use client";

import { createContext, useContext } from "react";
import { usePersistentState } from "@/lib/usePersistentState";
import { users } from "@/data/users";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Provider component that holds the logged-in user
export function AuthProvider({ children }) {
  const [user, setUser] = usePersistentState("cb-user", null);

  // Mock login: checks the dummy users list instead of a backend
  function login(email, password) {
    const found = users.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!found) {
      return { ok: false, error: "Invalid email or password. Try the demo account." };
    }
    // keep everything except the password in app state
    const safeUser = { id: found.id, name: found.name, email: found.email, rollNo: found.rollNo };
    setUser(safeUser);
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

// 3. Custom hook so components can use the context easily
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

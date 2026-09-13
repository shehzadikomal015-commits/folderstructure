"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { localStore, seedIfEmpty } from "@/lib/localStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    seedIfEmpty();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(localStore.getUser());
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      seedIfEmpty();
      setUser(localStore.getUser());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const login = useCallback(async (email, password) => {
    seedIfEmpty();
    const users = localStore.getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      throw new Error("Invalid email or password");
    }
    const sessionUser = {
      id: found.id,
      email: found.email,
      user_metadata: { name: found.name },
    };
    localStore.setUser(sessionUser);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    seedIfEmpty();
    const users = localStore.getUsers();
    if (users.find((u) => u.email === email)) {
      throw new Error("An account with this email already exists");
    }
    const newUser = {
      id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      email,
      password,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    localStore.setUsers(users);
    const sessionUser = {
      id: newUser.id,
      email: newUser.email,
      user_metadata: { name: newUser.name },
    };
    localStore.setUser(sessionUser);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(async () => {
    localStore.clearUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: false,
        hydrated,
        login,
        signup,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

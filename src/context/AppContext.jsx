/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { transactions as initialData } from "../data/transactions";
import { ROLES } from "../constants/roles";

const AppContext = createContext();

const LS_KEY = "transactions";

/**
 * Safely loads transactions from localStorage.
 * Falls back to initialData if the key is missing, corrupted, or not an array.
 */
function loadTransactions() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initialData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialData;
  } catch {
    return initialData;
  }
}

export function AppProvider({ children }) {
  // Lazy initializer: runs once on mount, reads from localStorage
  const [transactions, setTransactions] = useState(loadTransactions);
  const [role, setRole] = useState(ROLES.VIEWER);

  // Theme Management — always default to dark for premium SaaS feel
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // ── Milestone 11: Persist transactions to localStorage on every change ──
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(transactions));
    } catch {
      // Silently ignore write errors (e.g. private-browsing storage limits)
    }
  }, [transactions]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ── Milestone 12: Update a transaction by id (immutable map) ──
  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? { ...t, ...updatedTx } : t))
    );
  };

  /** Admin-only: clears localStorage and resets to initial mock data */
  const resetData = () => {
    localStorage.removeItem(LS_KEY);
    setTransactions(initialData);
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        resetData,
        role,
        setRole,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
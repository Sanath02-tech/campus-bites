"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

// Like useState, but the value lives in localStorage so it survives a
// page refresh (there is no backend in this MVP).
// useSyncExternalStore lets React read from an outside "store" safely.

const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener("storage", callback); // changes from other tabs
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function readRaw(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null; // storage blocked (e.g. private mode)
  }
}

function parse(raw, fallback) {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function usePersistentState(key, initialValue) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key), // browser: read saved value
    () => null // server: nothing saved, use initialValue
  );

  const value = useMemo(() => parse(raw, initialValue), [raw, initialValue]);

  const setValue = useCallback(
    (next) => {
      const current = parse(readRaw(key), initialValue);
      const resolved = typeof next === "function" ? next(current) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // ignore storage errors
      }
      listeners.forEach((notify) => notify());
    },
    [key, initialValue]
  );

  return [value, setValue];
}

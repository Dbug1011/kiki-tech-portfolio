"use client";
import { useEffect, useState } from "react";

/**
 * Returns false on the server and on the client's very first render (so it
 * always matches the server-rendered markup exactly), then flips to true
 * right after mount.
 *
 * Use this to gate any client-only value that can't be known during SSR
 * (matchMedia-based responsive checks, reduced-motion checks, etc.) so
 * reading it can never cause a React hydration mismatch.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

"use client";

import { useEffect, useState } from "react";

// Returns the current time and re-renders every `intervalMs`,
// used to make the simulated order status move forward.
export function useNow(intervalMs = 1000) {
  // starts at 0 so server and browser render the same thing; the real time
  // is filled in right after the page loads in the browser
  const [now, setNow] = useState(0);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, intervalMs);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [intervalMs]);
  return now;
}

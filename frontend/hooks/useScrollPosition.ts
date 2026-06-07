"use client";

import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const onScroll = () => setPos(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pos;
}

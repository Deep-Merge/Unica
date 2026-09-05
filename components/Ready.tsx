"use client";

import { useEffect } from "react";

export function Ready() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);

  return null;
}

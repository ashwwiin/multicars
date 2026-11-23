"use client";

import { useLenis } from "lenis/react";
import { useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useLenis((lenis) => {
    setProgress(lenis.progress);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-ink/15 backdrop-blur-sm">
      <div
        className="h-full bg-hivis transition-[width] duration-75 ease-out shadow-[0_0_10px_rgba(255,214,10,0.9)]"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { formatTime, site } from "@/lib/site";

type State = { open: boolean; label: string } | null;

function compute(now: Date): State {
  const today = site.hours.find((h) => h.day === now.getDay());
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: `Open now, until ${formatTime(today.close)}` };
  }
  // Find the next opening time.
  for (let i = 0; i < 8; i++) {
    const day = (now.getDay() + i) % 7;
    const h = site.hours.find((x) => x.day === day);
    if (!h) continue;
    if (i === 0 && minutes >= toMin(h.open)) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
    return { open: false, label: `Closed, opens ${when} at ${formatTime(h.open)}` };
  }
  return { open: false, label: "Closed" };
}

/** Rendered on the client only so server HTML never depends on the clock. */
export function OpenNow({ className = "" }: { className?: string }) {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    const update = () => setState(compute(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return <span className={`inline-block h-6 w-44 ${className}`} aria-hidden />;
  }

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-semibold ${className}`}
      role="status"
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${state.open ? "bg-emerald-500" : "bg-signal"}`}
        aria-hidden
      />
      {state.label}
    </span>
  );
}

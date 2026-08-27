"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="rounded-full bg-lemon px-5 py-2.5 text-sm font-semibold text-navy transition-transform hover:scale-105"
    >
      Click me: {count}
    </button>
  );
}

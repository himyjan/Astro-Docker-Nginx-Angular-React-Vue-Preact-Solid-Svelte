/** @jsxImportSource preact */

import { useState } from 'preact/hooks';
import type { ReactNode } from 'react';

export interface props {
    children?: ReactNode|string; }

/** A counter written with Preact */
export function PreactCounter({ children }: props) {
  const [count, setCount] = useState(0);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);

  return (
    <>
      <div class="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  );
}

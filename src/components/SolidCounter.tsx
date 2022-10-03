/** @jsxImportSource solid-js */

import { createSignal } from 'solid-js';

export interface props {
    children?: any; }

/** A counter written with Solid */
export default function SolidCounter({ children }: props) {
  const [count, setCount] = createSignal(0);
  const add = () => setCount(count() + 1);
  const subtract = () => setCount(count() - 1);

  return (
    <>
      <div id="solid" class="counter">
        <button onClick={subtract}>-</button>
        <pre>{count()}</pre>
        <button onClick={add}>+</button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  );
}

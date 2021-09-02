import React, { useState } from 'react';
import './App.scss';

export function App() {

  const [test, setTest] = useState("initial");

  async function onClick() {
    const a = await (await fetch("/api/test")).json();
    setTest(a["test"]);
  }

  return (
    <div className="app">
      Big TESTE 123 {test}
      <button type="button" onClick={onClick}>
        Click
      </button>
    </div>
  );
}

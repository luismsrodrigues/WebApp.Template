import React, {useState} from 'react';
import './App.scss';

export function App() {

  const [test, setTest] = useState("initial");

  async function onClick() {
    let a = await (await fetch("/api/test")).json();
    setTest(a["test"]);
  }
  
  return (
    <div className="app">
      Big Font {test}
      <button type="button" onClick={onClick}>
        Click
      </button>
    </div>
  );
}

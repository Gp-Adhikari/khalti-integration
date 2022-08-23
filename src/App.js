import React, { useState } from "react";

import logo from "./logo.svg";
import Khalti from "./components/khalti";

function App() {
  const [displayKhalti, setDisplayKhalti] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Khalti display={displayKhalti} amount={100 * 1000} config={{}} />
      </header>
    </div>
  );
}

export default App;

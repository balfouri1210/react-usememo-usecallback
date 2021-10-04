import React from 'react';
import logo from './logo.svg';
import './App.css';
import Translator from './components/translator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is test project to learn<br />
          <span>useMemo</span>, <span>useCallback</span>
        </p>

        <Translator />
      </header>
    </div>
  );
}

export default App;

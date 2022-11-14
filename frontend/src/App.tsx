import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AnyRecord } from 'dns';

function App() {
  const requestJSON = async (requestPath: any): Promise<any> => {
    const response = await fetch(requestPath)
      .then((res?: Response) => {
        console.log(res)
      })
      .catch(console.error)
  
    return response
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          onClick={() => {
            requestJSON('/api/hello')
          }}
        >
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;

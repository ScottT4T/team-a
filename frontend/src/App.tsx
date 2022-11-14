import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

//
//
// Response {type: 'basic', url: 'http://localhost/api/hello', redirected: false, status: 200, ok: true, …}
//
function App() {
  const [data, setdata] = useState<any>()
  const requestJSON = async (requestPath: any): Promise<any> => {
    const response = await fetch(requestPath, {method:"GET"})
      .then((res?: Response) => {
        res?.json().then((response) => {setdata(response)})
      })
      .catch(console.error)
    return response
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => {
            window.location.href="http://localhost:3333/hello"
          }}
          >
          Test Server (http://localhost:3333/hello)
        </button>
        <br/>
        <button
          onClick={() => {
            window.location.href="http://localhost/api/hello"
          }}
        >
          Test API (http://localhost/api/hello)
        </button>
        <br/>
        <button
          onClick={() => {
            requestJSON('/api/hello')
          }}
        >
          Test UI (fetch /api/hello)
        </button>
        <div id="response">{JSON.stringify(data)}</div>
      </header>
    </div>
  );
}

export default App;

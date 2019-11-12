import React from 'react';
import logo from './logo.svg';
import './App.css';

import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className='App-title'>Bem vindo ao sistema de gerenciamento de categorias e produtos da EvoxSolutions</h3>
      </header>
      <Routes />
    </div>
  );
}

export default App;

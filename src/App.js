import React from 'react';
import './App.css';
import Games from './components/Games/Games';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Games />
    </div>
  );
}

export default App;

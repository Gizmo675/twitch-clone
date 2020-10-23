import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import Games from './components/Games/Games';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/SideBar';
import TopStreams from './components/Topstreams/Topstreams'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />

        <Switch>
          <Route exact path='/' component={Games} />
          <Route exact path='/topstreams' component={TopStreams} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;

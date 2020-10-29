import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import Erreur from './components/Erreur/erreur';
// Component
import Games from './components/Games/Games';
import GameStreams from './components/GameStreams/gamestreams';
import Header from './components/Header/Header';
import Live from './components/Live/live';
import NotFound from './components/NotFound/notfound';
import Resultat from './components/Resultat/resultat';
import Sidebar from './components/Sidebar/SideBar';
import TopStreams from './components/Topstreams/Topstreams'

function App() {
  return (
    <Router
      forceRefresh={true}
    >
      <div className="App">
        <Header />
        <Sidebar />
        
        <Switch>
          <Route exact path='/' component={Games} />
          <Route exact path='/top-streams' component={TopStreams} />
          <Route exact path='/live/:slug' component={Live} />
          <Route exact path='/game/:slug' component={GameStreams} />
          <Route exact path='/resultat/:slug' component={Resultat} />
          <Route exact path='/resultat/' component={Erreur} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

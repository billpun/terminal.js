/* eslint-disable no-control-regex */
/* eslint-disable react/button-has-type */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.scss';
import Main from './components/main/Main';
// import { io } from 'socket.io-client';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

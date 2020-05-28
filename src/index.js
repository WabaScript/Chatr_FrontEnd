import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider'

import App from './App';


ReactDOM.render(
        <ActionCableProvider url="wss://https://chatr2020.herokuapp.com/cable">
      <Router>
          <Route path="/" render={routerProps => <App {...routerProps} /> } />
      </Router>
        </ActionCableProvider>,
  document.getElementById('root')
);

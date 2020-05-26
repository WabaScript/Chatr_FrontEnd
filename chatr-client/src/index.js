import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider'
import actionCable from 'actioncable';

import App from './App';


ReactDOM.render(
        <ActionCableProvider url="ws://localhost:3000/cable">
      <Router>
          <Route path="/" render={routerProps => <App {...routerProps} /> } />
      </Router>
        </ActionCableProvider>,
  document.getElementById('root')
);

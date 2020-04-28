import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider'
import App from './App';
import { API_WS_ROOT } from './ws';


ReactDOM.render(
  <Router>
    <ActionCableProvider url={API_WS_ROOT}>
    <Route path="/" component={App} />
    </ActionCableProvider>,
  </Router>,
  document.getElementById('root')
);

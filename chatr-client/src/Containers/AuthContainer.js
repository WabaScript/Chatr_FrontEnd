import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import NavBar from './Components/NavBar'
import { render } from 'react-dom';

export default class AuthContainer extends React.Component {

  state = {
    auth: []
  }


  render() {
       
      return(
          <div>
                hi Auth
          </div>
      )
  }

}
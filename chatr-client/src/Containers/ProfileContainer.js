import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import NavBar from './Components/NavBar'
import { render } from 'react-dom';

export default class ProfileContainer extends React.Component {

  state = {
    profiles: []
  }


  render() {
       
      return(
          <div>
                hi Profile
          </div>
      )
  }

}
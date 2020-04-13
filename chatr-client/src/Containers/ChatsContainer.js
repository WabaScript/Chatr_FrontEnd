import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import NavBar from './Components/NavBar'
import { render } from 'react-dom';

export default class ChatsContainer extends React.Component {

  state = {
    chats: []
  }

  componentDidMount() {
      console.log("hi")
    fetch(`http://localhost:6969/chats`)
    .then(resp => resp.json())
    .then(chats => this.setState({ chats: chats }))
    
  }

  render() {
       console.log(this.state.chats)
      return(
          <div>
                hi
          </div>
      )
  }

}
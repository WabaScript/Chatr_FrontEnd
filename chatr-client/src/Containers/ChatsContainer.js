import React from 'react';
import {Route} from 'react-router-dom'
// import NavBar from './Components/NavBar'
import { render } from 'react-dom';
import Chat from "../Components/Chat"
import ChatsList from "../Components/ChatsList"

export default class ChatsContainer extends React.Component {

  state = {
    messages: [],
    users: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/messages`)
    .then(resp => resp.json())
    .then(messages => this.setState({ messages: messages }))

    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(users => this.setState({ users: users }))
  }

  render() {
    console.log(this.props.match.url)
      return(
          <div>
            <ChatsList chats={this.props.chats}/>
            {<Route exact path={`${this.props.match.url}/:chatId`} render={routerProps => <Chat {...routerProps} chats={this.props.chats} messages={this.state.messages} users={this.state.users}/> }/>}
          </div>
      )
  }

}
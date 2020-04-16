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

  handleMessageSubmit = (e, message) => {
    e.preventDefault()
    fetch(`http://localhost:3000/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(message)
    })
    .then(resp => resp.json())
    .then(message => this.setState({ messages: [...this.state.messages, message] }))
    e.target.reset()
  }

  render() {
      return(
          <div>
            <ChatsList chats={this.props.chats} deleteChat={this.props.deleteChat}/>
            <Route exact path={`${this.props.match.url}/:chatId`} 
                render={routerProps => 
                  <Chat {...routerProps} 
                    chats={this.props.chats} 
                    messages={this.state.messages} 
                    users={this.state.users} 
                    handleMessageSubmit={this.handleMessageSubmit}
                    currentUser={this.props.currentUser}/> 
                  }/>
          </div>
      )
  }

}
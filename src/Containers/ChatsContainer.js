import React from 'react';
import {Route} from 'react-router-dom'
// import NavBar from './Components/NavBar'
import { render } from 'react-dom';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Chat from "../Components/Chat"
import ChatsList from "../Components/ChatsList"

const actioncable = require("actioncable")

export default class ChatsContainer extends React.Component {

  state = {
    chats: [],
    messages: [],
    users: [],
    edit: false
  }

  componentDidMount() {
    
    this.setState({chats: this.props.chats})

    fetch(`https://chatr2020.herokuapp.com/messages`)
    .then(resp => resp.json())
    .then(messages => this.setState({ messages: messages }))

    fetch(`https://chatr2020.herokuapp.com/users`)
    .then(resp => resp.json())
    .then(users => this.setState({ users: users }))
  }

  handleMessageSubmit = async (e, message) => {
    e.preventDefault()
    await fetch(`https://chatr2020.herokuapp.com/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(message)
    })
  }

  deleteMessage = (message) => {
    fetch(`https://chatr2020.herokuapp.com/messages/${message.id}`, {method: "DELETE"} )
    let newArray =  this.state.messages.filter(msg => msg.id !== message.id)
    this.setState({
      messages: newArray
    })
  }

  handleEditMessageSubmit = (e, msg) => {
    e.preventDefault()
    fetch(`https://chatr2020.herokuapp.com/messages/${msg.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(msg)
    })
      let newArray =  this.state.messages.map(message => msg.id === message.id ? msg : message)
      this.setState({
        messages: newArray,
        edit: !this.state.edit
      })
  }

  handleEditChange = () => {
    this.setState({ edit: !this.state.edit})
  }

  // web socket testing receptions
  incomingMessage = (response) => {
    console.log(response.message)
    
      this.setState({
        messages: [...this.state.messages, response.message]
      });
    
  };

  render() {
      return(
          <div>
            <ActionCableConsumer
                channel={{ channel: 'MessagesChannel' }}
                onReceived={this.incomingMessage}
            >
            <ChatsList chats={this.props.chats} deleteChat={this.props.deleteChat}/>
            <Route exact path={`${this.props.match.url}/:chatId`} 
                render={routerProps => this.state.users.length > 0 &&
                  <Chat {...routerProps} 
                    edit={this.state.edit}
                    handleEditChange={this.handleEditChange}
                    chats={this.props.chats} 
                    messages={this.state.messages} 
                    users={this.state.users} 
                    handleMessageSubmit={this.handleMessageSubmit}
                    handleEditMessageSubmit={this.handleEditMessageSubmit}
                    deleteMessage={this.deleteMessage}
                    currentUser={this.props.currentUser}/> 
                  }/>
            </ActionCableConsumer>
          </div>
      )
  }

}
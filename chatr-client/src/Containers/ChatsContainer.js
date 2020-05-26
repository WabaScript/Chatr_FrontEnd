import React from 'react';
import {Route} from 'react-router-dom'
// import NavBar from './Components/NavBar'
import { render } from 'react-dom';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Chat from "../Components/Chat"
import ChatsList from "../Components/ChatsList"
import Cable from '../Components/Cable'

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
    this.setState({ messages: [...this.state.messages, message] })
    e.target.reset()
  }

  deleteMessage = (message) => {
    fetch(`http://localhost:3000/messages/${message.id}`, {method: "DELETE"} )
    let newArray =  this.state.messages.filter(msg => msg.id !== message.id)
    this.setState({
      messages: newArray
    })
  }

  handleEditMessageSubmit = (e, msg) => {
    e.preventDefault()
    fetch(`http://localhost:3000/messages/${msg.id}`, {
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

  // componentDidUpdate(_, prevState) {
  //     if (prevState.messages === this.state.messages) {
  //       fetch(`http://localhost:3000/messages`)
  //       .then(res => res.json())
  //       .then(res => this.setState({ messages: res}))
  //       }
  //   }

  handleEditChange = () => {
    this.setState({ edit: !this.state.edit})
  }
  

  incomingMessage = response => {
    const { message } = response;
    const chats = [...this.state.chats];
    const chat = chats.find(
      chat => chat.id === message.chat_id
    );
    chat.messages = [...chat.messages, message];
    this.setState({ chats });
  };

  render() {
      return(
          <div>
             
                 {/* {this.state.chats.length ? (
                <Cable
                  chats={this.state.chats}
                  onReceived={this.incomingMessage}
                />
              ) : null} */}
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
            
          </div>
      )
  }

}
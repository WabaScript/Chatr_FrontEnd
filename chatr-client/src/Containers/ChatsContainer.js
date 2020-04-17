import React from 'react';
import {Route} from 'react-router-dom'
// import NavBar from './Components/NavBar'
import { render } from 'react-dom';
import Chat from "../Components/Chat"
import ChatsList from "../Components/ChatsList"

export default class ChatsContainer extends React.Component {

  state = {
    messages: [],
    users: [],
    edit: false
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
    .then(resp => resp.json())
    .then(json => {
      let newArray =  this.state.messages.map(message => msg.id === json.id ? json : message)
      this.setState({
        messages: newArray,
        edit: !this.state.edit
      })
    })
  }

  handleEditChange = () => {
    this.setState({ edit: !this.state.edit})
  }
  

  render() {
      return(
          <div>
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
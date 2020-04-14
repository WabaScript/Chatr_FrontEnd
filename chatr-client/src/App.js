import React from 'react';
import {Switch, Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import ChatsContainer from './Containers/ChatsContainer'
import NewChatForm from './Components/NewChatForm';
import Signup from './Components/Signup'

class App extends React.Component {

  state = {
    chats: [],
    users: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/chats`)
    .then(resp => resp.json())
    .then(chats => this.setState({ chats: chats }))

    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(users => this.setState({ users: users }))
  }

  handleSubmit = (e, chat) => {
    e.preventDefault()
    fetch(`http://localhost:3000/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(chat)
    })
    .then(resp => resp.json())
    .then(chat => this.setState({ chats: [...this.state.chats, chat] }))
    e.target.reset()
  }

  handleSignupSubmit = (e, user) => {
    e.preventDefault()
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => this.setState({ users: [...this.state.users, user] }))
    e.target.reset()
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
            <Route path="/signup" render={routerProps => <Signup {...routerProps} handleSignupSubmit={this.handleSignupSubmit}/> } />
            <Route path="/chats" render={routerProps => <ChatsContainer {...routerProps} chats={this.state.chats} users={this.state.users}/>} />
        </Switch>
        <NewChatForm handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;

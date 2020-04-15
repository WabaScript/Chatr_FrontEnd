import React from 'react';
import {Switch, Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import ChatsContainer from './Containers/ChatsContainer'
import NewChatForm from './Components/NewChatForm';
import Signup from './Components/Signup'
import Login from './Components/Login'

class App extends React.Component {

  state = {
    chats: [],
    users: [],
    currentUser: null
  }

  componentDidMount() {
    const user_id = localStorage.user_id
    if(user_id) {
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": user_id
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.errors){
          alert(res.errors)
        } else {
          this.setState({ currentUser: res})
        }
      })
    }

    fetch(`http://localhost:3000/chats`)
    .then(resp => resp.json())
    .then(chats => this.setState({ chats: chats }))

    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(users => this.setState({ users: users }))
  }

    // Login Session Handler
    setUser = (user) => {
      this.setState({
        currentUser: user
      }, () => {
        localStorage.user_id = user.id
        this.props.history.push("/chats")
      })
    }

  //handle New Chat
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

  //Handle New User Sign UP
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
            <Route path="/login" render={routerProps => <Login {...routerProps} setUser={this.setUser} /> } />
            <Route path="/chats" render={routerProps => <ChatsContainer {...routerProps} chats={this.state.chats} currentUser={this.state.currentUser} users={this.state.users}/>} />
            <Route path="/newChat" render={routerProps => <NewChatForm {...routerProps} handleSubmit={this.handleSubmit}/>} currentUser={this.state.currentUser} />
        </Switch>
      </div>
    );
  }
}


export default App;

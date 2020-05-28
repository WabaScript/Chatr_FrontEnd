import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import {Switch, Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import ChatsContainer from './Containers/ChatsContainer'
import NewChatForm from './Components/NewChatForm';
import Signup from './Components/Signup'
import Login from './Components/Login'
import GlobalStyle from './styles/Global';
import Profile from './Components/Profile';
import Meme from './Components/Meme';
const API_KEY = (process.env.REACT_APP_API_KEY)

class App extends React.Component {

  state = {
    chats: [],
    users: [],
    currentUser: null,
    loggedIn: false,
    navbarOpen: false,
    memes: []
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
          this.setState({ currentUser: res, loggedIn: true})
        }
      })
    }

    fetch(`http://localhost:3000/chats`)
    .then(resp => resp.json())
    .then(chats => this.setState({ chats: chats }))

    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=G`)
    .then(res => res.json())
    .then(meme => this.setState({memes: meme.data.images.downsized_large.url}))
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

    // Login Session Handler
    setUser = (user) => {
      this.setState({
        currentUser: user,
        loggedIn: true
      }, () => {
        localStorage.user_id = user.id
        this.props.history.push("/chats")
      })
    }

    // Logout Handler
    logout = () => {
      this.setState({
        currentUser: null,
        loggedIn: false
      }, () => {
        localStorage.removeItem("user_id")
        alert("You have been logged out!")
        this.props.history.push("/login")
      })
    }

  //handle New Chat
  handleSubmit = async (e, chat) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(chat)
    })
    // .then(resp => resp.json())
    this.props.history.push(`/chats`)
    // .then(chat => this.setState({ chats: [...this.state.chats, chat] }))
    // .then(this.props.history.push(`/chats/${chat.id}`))
    if (!e.target === null) {
      e.target.reset()
    }
  }

  //Handle New User Sign UP
  handleSignupSubmit = (e, user) => {
    e.preventDefault()
    fetch(`http://localhost:3000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user: user})
    })
    .then(res => res.json())
    .then( res => {
        if (res.errors){
          alert(res.errors)
        } else {
          this.setUser(res)
        }
      })
    //   e.target.reset()
  }


  newMeme = () => {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=G`)
    .then(res => res.json())
    .then(meme => this.setState({memes: meme.data.images.downsized_large.url}))
  }

   // web socket testing receptions
   incomingChat = response => {
    const {chat} = response
    if (!this.state.chats.some(c => c.id === chat.id)) {
      this.setState({
        chats: [...this.state.chats, chat]
      });
    }
  };

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} navbarState={this.state.navbarOpen} handleNavbar={this.handleNavbar}/>
        <GlobalStyle />
        { this.state.loggedIn && <button className={"logOutBtn"} onClick={this.logout} >Logout</button> }
        <Switch>
        <ActionCableConsumer
                channel={{ channel: 'ChatsChannel' }}
                onReceived={this.incomingChat}
        >
            <Route exact path='/' render={routerProps => <Meme {...routerProps} newMeme={this.newMeme} memes={this.state.memes} /> } />
            <Route path="/signup" render={routerProps => <Signup {...routerProps} handleSignupSubmit={this.handleSignupSubmit}/> } />
            <Route path="/login" render={routerProps => <Login {...routerProps} setUser={this.setUser} /> } />
            <Route path="/chats" render={routerProps => <ChatsContainer {...routerProps} chats={this.state.chats} currentUser={this.state.currentUser} />} />
            <Route path="/newChat" render={routerProps => <NewChatForm {...routerProps} handleSubmit={this.handleSubmit} currentUser={this.state.currentUser}/>} />
            <Route path="/profile" render={routerProps => this.state.loggedIn ? <Profile {...routerProps} currentUser={this.state.currentUser}/> : <Meme {...routerProps} newMeme={this.newMeme} memes={this.state.memes} /> } />
        </ActionCableConsumer>
        </Switch>
      </div>
    );
  }
}


export default App;

import React from 'react';
import {Switch, Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import ChatsContainer from './Containers/ChatsContainer'
import NewChatForm from './Components/NewChatForm';

class App extends React.Component {

  state = {
    chats: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/chats`)
    .then(resp => resp.json())
    .then(chats => this.setState({ chats: chats }))
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

  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <Switch>
            <Route path="/chats" render={routerProps => <ChatsContainer {...routerProps} chats={this.state.chats}/>} />
        </Switch>
        <NewChatForm handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;

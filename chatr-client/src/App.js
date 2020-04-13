import React from 'react';
import {Switch, Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import ChatsContainer from './Containers/ChatsContainer'

class App extends React.Component {

  state = {
    chats: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/chats`)
    .then(resp => resp.json())
    .then(chats => this.setState({ chats: chats }))
  }

  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <Switch>
            <Route path="/chats" render={routerProps => <ChatsContainer {...routerProps} chats={this.state.chats}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import ChatsContainer from './Containers/ChatsContainer'

class App extends React.Component {

  state = {
    chats: [],
    messages: [],
    users: []
  }

  render() {
    return (
      <Router >
      <div>
        {/* <NavBar /> */}
        
  
    <Route exact path="/chats" component={ChatsContainer} /> 
  

      </div>
        </Router>
    );
  }
}

export default App;

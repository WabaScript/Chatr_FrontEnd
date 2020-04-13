import React from 'react';
import {Link} from 'react-router-dom'

export default class ChatsList extends React.Component {

  renderChats = () => {
    return Object.keys(this.props.chats).map(chatId => {
        return <Link key={parseInt(chatId) + 1} to={`/chats/${parseInt(chatId) + 1}`}>{this.props.chats[chatId].topic}<br/></Link>
    })
  }

  render() {
      return(
          <div>
            {this.renderChats()}
          </div>
      )
  }

}


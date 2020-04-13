import React from 'react';
import {Link} from 'react-router-dom'

export default class ChatsList extends React.Component {

  renderChats = () => {
    return Object.keys(this.props.chats).map(chatId => {
      return <Link key={chatId} to={`/chats/${chatId}`}>{this.props.chats[chatId].topic}<br/></Link>
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
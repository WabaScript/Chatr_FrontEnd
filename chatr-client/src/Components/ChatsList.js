import React from 'react';
import {Link} from 'react-router-dom'

export default class ChatsList extends React.Component {

    link =  {
        width: '300px',
        padding: '12px',
        margin: "0 6px 6px",
        background: 'red',
        color: 'white',
        fontSize: 20
    }

  renderChats = () => {
    return Object.keys(this.props.chats).map(chatId => {
        return <div style={this.link}><Link key={parseInt(chatId) + 1} to={`/chats/${parseInt(chatId) + 1}`}>{this.props.chats[chatId].topic}<br/></Link></div>
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


import React from 'react';
import {Link} from 'react-router-dom'
import '../styles/hover-min.css'

export default class ChatsList extends React.Component {

    // link =  {
    //   color: "#fff !important",
    //   textTransform: "uppercase",
    //   textDecoration: 'none',
    //   background: '#ed3330',
    //   padding: '20px',
    //   borderRadius: '5px',
    //   display: 'inline-block',
    //   border: 'none',
    //   transition: 'all 0.4s ease 0s'
    // }
    

  renderChats = () => {
    return Object.keys(this.props.chats).map(chatId => {
        return <div className={"example_a"}>
          
          <Link className={"hvr-pulse-shrink"} key={parseInt(chatId) + 1} to={`/chats/${parseInt(chatId) + 1}`}>{this.props.chats[chatId].topic}<br/></Link></div>
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


import React from 'react'
import {useParams} from "react-router-dom"
import NewMessageForm from './NewMessageForm'

const Chat = (props) => {

    let {chatId} = useParams()

    const renderMessages = () => {
        if (props.chats.length > 0) {
            let user = ''
            return props.messages.map(message => {
                user = props.users.find(user => user.id === message.user_id )
                return <div> {message.chat_id == chatId && (user.username + ":")} {message.chat_id == chatId && message.content}</div>
            }) 
        }
    }

    return (
        <div>
            <h3>{props.chats.length > 0 ? props.chats[chatId - 1].topic : null}</h3>
            {renderMessages()}
            <NewMessageForm chat_id={chatId} handleMessageSubmit={props.handleMessageSubmit} currentUser={props.currentUser} />
        </div>
    )

}

export default Chat;
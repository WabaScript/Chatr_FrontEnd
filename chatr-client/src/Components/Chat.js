import React from 'react'
import {useParams} from "react-router-dom"

const Chat = (props) => {

    let {chatId} = useParams()

    const renderMessages = () => {
        if (props.chats.length > 0) {
            return props.messages.map(message => {
                return <div>{props.users.map(user => {return <p> {user.id === message.user_id ? user.username : null} </p>}) }
                    {message.chat_id == chatId ? message.content : null}</div>
            }) 
        }
    }

    return (
        <div>
            <h3>{props.chats.length > 0 ? props.chats[chatId - 1].topic : null}</h3>
            {renderMessages()}
        </div>
    )

}

export default Chat;
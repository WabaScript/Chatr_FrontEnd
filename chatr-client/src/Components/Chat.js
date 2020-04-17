import React, { useState } from 'react'
import {useParams} from "react-router-dom"
import NewMessageForm from './NewMessageForm'
import EditMessageForm from './EditMessageForm'
import Message from './Message'

const Chat = (props) => {

    let {chatId} = useParams()

    // const [editToggle, setEditToggle] = useState(false);

    const renderMessages = () => {
        if (props.chats.length > 0) {
            let messages = props.messages.filter(message => message.chat_id == chatId)
            return messages.map(message => {
                return <Message 
                            edit={props.edit} 
                            deleteMessage={props.deleteMessage} 
                            handleEditChange={props.handleEditChange}
                            handleEditMessageSubmit={props.handleEditMessageSubmit}
                            message={message} 
                            currentUser={props.currentUser} 
                            users={props.users}/>
            })  
            
        }
    }
    

    return (
        <div>
            <h3>{props.chats.length > 0 && props.messages.length > 0 ? props.chats[chatId - 1].topic : null}</h3>
            {renderMessages()}
            
            <NewMessageForm chat_id={chatId} handleMessageSubmit={props.handleMessageSubmit} currentUser={props.currentUser} />
            
            </div>
    )

}

export default Chat;
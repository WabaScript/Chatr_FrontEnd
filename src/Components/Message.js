import React from 'react'
import {useParams} from "react-router-dom"
import NewMessageForm from './NewMessageForm'
import EditMessageForm from './EditMessageForm'

const Message = (props) => {

    let user = props.users.find(user => user.id === props.message.user_id )

    return (
        <div> 
            {user.username + ":"} {props.message.content + "  "}
            
            {props.currentUser && props.message.user_id === props.currentUser.id ? 
                <button className={"editBtn"} onClick={() => props.handleEditChange()}> edit</button> : null}
            {props.currentUser && props.message.user_id === props.currentUser.id && props.edit ? 
                <EditMessageForm handleEditMessageSubmit={props.handleEditMessageSubmit} message={props.message}/> : null}

            {props.currentUser && props.message.user_id === props.currentUser.id ? 
                <button className={"editBtn"} onClick={() => props.deleteMessage(props.message)}> X</button> : null}
        </div> 
    )
}

export default Message

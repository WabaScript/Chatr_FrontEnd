import React from 'react'
import {useParams} from "react-router-dom"

const Chat = (props) => {

    let {chatId} = useParams()
    console.log(props.chats)
    return (
        <div>
            <h3>{props.chats.length > 0 ? props.chats[chatId].topic : null}</h3>
        </div>
    )

}

export default Chat;
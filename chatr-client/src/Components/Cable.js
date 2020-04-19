import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ chats, incomingMessage }) => {
  return (
    <Fragment>
      {chats.map(chat => {
        return (
          <ActionCable
            key={chat.id}  
            channel={{ channel: 'MessagesChannel', chat: chat.id }}
            onReceived={incomingMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
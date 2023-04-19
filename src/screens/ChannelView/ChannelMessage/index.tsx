import React from 'react';
import {Message} from '../../../gql/types';

import {ChannelMessageType} from '../../../gql/types';
import TaskMessage from './TaskMessage';
import {ApolloClient} from '@apollo/client';

interface ChannelMessageProps {
  message: Message;
  client: ApolloClient<any>;
}

const ChannelMessage = ({message, client}: ChannelMessageProps) => {
  const {messageType} = message;

  if (messageType === ChannelMessageType.Task) {
    return <TaskMessage message={message} client={client} />;
  }

  return <></>;
};

export default ChannelMessage;

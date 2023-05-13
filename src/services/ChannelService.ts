import {ApolloClient} from '@apollo/client';
import {
  ChangeChannelStatusInput,
  Message,
  SendMessageInput,
} from '../gql/types';
import {CHANNEL_MESSAGES_QUERY, ChannelMessagesQueryData} from '../gql/queries';
import {getContext} from './ApolloService';
import {Alert} from 'react-native';
import {
  CHANGE_CHANNEL_STATUS,
  ChangeChannelStatusResult,
  SEND_MESSAGE_ON_CHANNEL_MUTATION,
  SendMessageOnChannelResult,
} from '../gql/mutations';

export const getChannelMessages = async (
  client: ApolloClient<any>,
  channelId: string,
): Promise<Message[]> => {
  const result = await client.query({
    query: CHANNEL_MESSAGES_QUERY,
    fetchPolicy: 'no-cache',
    context: getContext(),
    variables: {
      channelId,
    },
  });

  if (result.error) {
    Alert.alert(result.error.message);
  }

  const messages: ChannelMessagesQueryData = result.data;

  return messages.channelMessages;
};

export const sendMessageOnChannel = async (
  client: ApolloClient<any>,
  input: SendMessageInput,
) => {
  const result = await client.mutate({
    mutation: SEND_MESSAGE_ON_CHANNEL_MUTATION,
    context: getContext(),
    variables: {
      input,
    },
  });

  if (result.errors) {
    Alert.alert(result.errors[0].message);
  }

  const message: SendMessageOnChannelResult = result.data;

  return message.sendMessageOnChannel;
};

export const changeChannelStatus = async (
  client: ApolloClient<any>,
  input: ChangeChannelStatusInput,
) => {
  const result = await client.mutate({
    mutation: CHANGE_CHANNEL_STATUS,
    context: getContext(),
    variables: {
      input,
    },
  });

  if (result.errors) {
    Alert.alert(result.errors[0].message);
  }

  const channel: ChangeChannelStatusResult = result.data;

  return channel.changeChannelStatus;
};

import {gql} from '@apollo/client';
import {Channel, ChannelCharacter, Message, User} from './types';

// Me Query and its interface
export interface GetMeQueryData {
  me: User;
}
export const ME_QUERY = gql`
  query GetMeQuery {
    me {
      id
      email
      phoneNumber
      displayName
      avatar
      updatedAt
      createdAt
    }
  }
`;

// Init query and its interface
export interface GetInitialValuesQueryData {
  channelCharacters: [ChannelCharacter];
  userChannels: [Channel];
}
export const INIT_QUERY = gql`
  query GetInitialValuesQuery($userId: String!) {
    channelCharacters {
      id
      displayName
      imageUrl
      description
      updatedAt
      createdAt
    }
    userChannels(userId: $userId) {
      id
      displayName
      imageUrl
      count
      updatedAt
      createdAt
      channelCharacter {
        id
        displayName
        imageUrl
        description
        updatedAt
        createdAt
      }
    }
  }
`;

export interface ChannelMessagesQueryData {
  channelMessages: Message[];
}
export const CHANNEL_MESSAGES_QUERY = gql`
  query ChannelMessages($channelId: String!) {
    channelMessages(channelId: $channelId) {
      id
      text
      description
      messageType
      messageStatus
      createdAt
      updatedAt
    }
  }
`;

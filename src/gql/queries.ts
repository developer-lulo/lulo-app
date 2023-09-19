import {gql} from '@apollo/client';
import {Channel, Message, User} from './types';
import {CHANNEL_CHARACTER_FRAGMENT} from './fragments';

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
      availableChannelCharacters {
        ...CharactersFragment
      }
    }
  }
  ${CHANNEL_CHARACTER_FRAGMENT}
`;

// Init query and its interface
export interface GetChannelsQueryData {
  userChannels: [Channel];
}
export const GET_CHANNELS = gql`
  query getChannelsQuery($userId: String!) {
    userChannels(userId: $userId) {
      id
      displayName
      imageUrl
      count
      updatedAt
      createdAt
      channelCharacterId
      channelCharacter {
        ...CharactersFragment
      }
    }
  }
  ${CHANNEL_CHARACTER_FRAGMENT}
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

import {gql} from '@apollo/client';
import {Channel, Message} from './types';

export interface CreateChannelMutationResult {
  createChannel: Channel;
}

export const CREATE_CHANNEL_MUTATION = gql`
  mutation CreateChannel($input: CreateChannelInput) {
    createChannel(input: $input) {
      id
      displayName
      imageUrl
      updatedAt
      createdAt
      channelCharacterId
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

export interface SendMessageOnChannelResult {
  sendMessageOnChannel: Message;
}

export const SEND_MESSAGE_ON_CHANNEL_MUTATION = gql`
  mutation SendMessageOnChannel($input: SendMessageInput) {
    sendMessageOnChannel(input: $input) {
      id
      text
      messageType
      messageStatus
      createdAt
      updatedAt
    }
  }
`;

export interface ChangeMessageStatusResult {
  changeMessageStatus: Message;
}

export const CHANGE_MESSAGE_STATUS = gql`
  mutation ChangeMessageStatus($input: ChangeMessageStatusInput) {
    changeMessageStatus(input: $input) {
      id
      text
      messageType
      messageStatus
      createdAt
      updatedAt
    }
  }
`;

export interface ChangeChannelStatusResult {
  changeChannelStatus: Channel;
}

export const CHANGE_CHANNEL_STATUS = gql`
  mutation ChangeChannelStatus($input: ChangeChannelStatusInput) {
    changeChannelStatus(input: $input) {
      channelStatus
      displayName
      channelCharacter {
        id
        displayName
        imageUrl
        description
        updatedAt
        createdAt
      }
      channelCharacterId
      createdAt
      id
      imageUrl
      updatedAt
    }
  }
`;

export interface UpdateMessageBasicInfoResult {
  updateMessageBasicInfo: Message;
}

export const UPDATE_MESSAGE_BASIC_INFO = gql`
  mutation UpdateMessageBasicInfo($input: UpdateMessageBasicInfo) {
    updateMessageBasicInfo(input: $input) {
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

export interface MoveMessageToChannelResult {
  moveMessageToChannel: Message;
}
export const MOVE_MESSAGE_TO_CHANNEL = gql`
  mutation MoveMessageToChannel($input: MoveMessageToChannelInput) {
    moveMessageToChannel(input: $input) {
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

import {Text} from 'react-native';
import React from 'react';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import {
  Channel,
  ChannelCharacter,
  ChannelCharacterKey,
} from '../../../gql/types';
import PinnapleCard from './PinnapleChatCard';
import OrangeCard from './OrangeChatCard';

dayjs.extend(calendar);
export interface Chat {
  avatar: string;
  chatName: string;
  characterName: string;
  lastUpdate: Date;
}

export interface ChatCardProps {
  chat: Channel;
  onPress?: () => void;
}

const ChatCard = ({chat, ...props}: ChatCardProps) => {
  const getChatComponent = (channel: Channel) => {
    const character: ChannelCharacter | null | undefined =
      channel.channelCharacter;

    if (character && character.id) {
      switch (character.key) {
        case ChannelCharacterKey.Pinnaple:
          return <PinnapleCard chat={channel} {...props} />;

        case ChannelCharacterKey.Orange:
          return <OrangeCard chat={channel} {...props} />;

        case ChannelCharacterKey.UnSet:
          return <></>;
      }
    }
  };

  return getChatComponent(chat);
};

export default ChatCard;

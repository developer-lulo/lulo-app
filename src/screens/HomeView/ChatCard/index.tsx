import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import {Channel} from '../../../gql/types';
import {DEFAULT_AVATAR} from '../../../constants';

dayjs.extend(calendar);
export interface Chat {
  avatar: string;
  chatName: string;
  characterName: string;
  lastUpdate: Date;
}

export interface ChatCardProps {
  onPress?: Function;
  chat: Channel;
}

const DEFAULT_VALUES = {
  image: DEFAULT_AVATAR,
  title: 'No Named Channel',
};

const CALENDAR_FORMAT = {
  sameDay: 'h:mm A', // The same day ( Today at 2:30 AM )
  lastDay: '[Yesterday]', // The day before ( Yesterday )
  lastWeek: 'dddd', // Last week ( Last Monday at 2:30 AM )
  sameElse: 'DD/MM/YYYY', // Everything else ( 17/10/2011 )
};

const ChatCard = ({chat, onPress}: ChatCardProps) => {
  const updatedAtDate = new Date(chat.updatedAt || '');
  const updatedAtByDayjs = dayjs(updatedAtDate);

  const _onPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_onPress}>
      <View style={styles.infoContainer}>
        <Image
          style={{...styles.avatar}}
          source={chat.imageUrl ? {uri: chat.imageUrl} : DEFAULT_VALUES.image}
        />
        <View style={styles.chatInfoContainer}>
          <Text style={styles.title}>
            {chat.displayName || DEFAULT_VALUES.title}
          </Text>
          <Text style={styles.subtitle}>
            {chat.channelCharacter?.displayName || DEFAULT_VALUES.title}
          </Text>
        </View>
      </View>
      <View style={styles.extededInfoContainer}>
        <Text style={styles.date}>
          {updatedAtByDayjs.calendar(null, CALENDAR_FORMAT)}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

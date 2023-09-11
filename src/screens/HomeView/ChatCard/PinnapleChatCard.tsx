import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import styles from './styles';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import {Channel} from '../../../gql/types';
import {DEFAULT_AVATAR} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const TEXT_MAX_LENGTH = 25;

const pinnapleStyles = StyleSheet.create({
  badge: {
    backgroundColor: '#FFC7C7',
  },
  badgeText: {
    color: 'red',
  },
});

dayjs.extend(calendar);

export interface Chat {
  avatar: string;
  chatName: string;
  characterName: string;
  lastUpdate: Date;
}

export interface PinnapleCardProps {
  chat: Channel;
  onPress?: () => void;
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

const PinnapleCard = ({chat, onPress}: PinnapleCardProps) => {
  const updatedAtDate = new Date(chat.updatedAt || '');
  const updatedAtByDayjs = dayjs(updatedAtDate);

  const navigation = useNavigation();

  const _onPress = () => {
    if (onPress) {
      onPress();
      return;
    } else {
      navigation.navigate('ChannelView', {
        channel: chat,
      });
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
            {chat.displayName && chat.displayName.length > TEXT_MAX_LENGTH
              ? chat.displayName.substring(0, TEXT_MAX_LENGTH - 3) + '...'
              : chat.displayName}
          </Text>
          <Text style={styles.subtitle}>
            {chat.channelCharacter?.displayName || DEFAULT_VALUES.title}
          </Text>
        </View>
      </View>
      <View style={styles.extededInfoContainer}>
        <View>
          {chat.count ? (
            <View style={{...styles.counterBadge, ...pinnapleStyles.badge}}>
              <Text
                style={{
                  ...styles.counterBadgeText,
                  ...pinnapleStyles.badgeText,
                }}>
                {chat.count}
              </Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.date}>
          {updatedAtByDayjs.calendar(null, CALENDAR_FORMAT)}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PinnapleCard;

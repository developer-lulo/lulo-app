import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import styles from './styles';

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import {Channel} from '../../../gql/types';
import {DEFAULT_AVATAR, MAIN_SHADOW} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const orangeStyles = StyleSheet.create({
  imageContainer: {},
  badge: {
    position: 'absolute',
    right: 5,
    top: 5,
    ...MAIN_SHADOW,
  },
  card: {
    backgroundColor: '#FFE4E4',
    borderRadius: 50,
    borderColor: '#FFC7C7',
    borderWidth: 4,
  },
});

dayjs.extend(calendar);

export interface Chat {
  avatar: string;
  chatName: string;
  characterName: string;
  lastUpdate: Date;
}

export interface OrangeCardProps {
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

const OrangeCard = ({chat, onPress}: OrangeCardProps) => {
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
    <TouchableOpacity
      style={{...styles.container, ...orangeStyles.card}}
      onPress={_onPress}>
      <View style={styles.infoContainer}>
        <View style={orangeStyles.imageContainer}>
          <Image
            style={{...styles.avatar}}
            source={chat.imageUrl ? {uri: chat.imageUrl} : DEFAULT_VALUES.image}
          />
          <View style={orangeStyles.badge}>
            {chat.count ? (
              <View style={styles.counterBadge}>
                <Text style={styles.counterBadgeText}>{chat.count}</Text>
              </View>
            ) : null}
          </View>
        </View>
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
        <View />
        <Text style={styles.date}>
          {updatedAtByDayjs.calendar(null, CALENDAR_FORMAT)}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrangeCard;

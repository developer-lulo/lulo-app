import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

export interface Chat {
  avatar: string;
  chatName: string;
  characterName: string;
  lastUpdate: Date;
}

export interface ChatCardProps {
  onPress?: Function;
  chat: Chat;
}

const ChatCard = ({chat}: ChatCardProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{uri: chat.avatar}} />
        <View style={styles.chatInfoContainer}>
          <Text style={styles.title}> {chat.chatName}</Text>
          <Text style={styles.subtitle}> {chat.characterName}</Text>
        </View>
      </View>
      <View style={styles.extededInfoContainer}>
        {/* <Text style={styles.date}> {chat.lastUpdate.toISOString()} </Text> */}
        <Text style={styles.date}> 08:33 am </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

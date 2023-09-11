import {Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {HEADER_BACK_BUTTON} from '../../../constants';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Channel} from '../../../gql/types';
import {messages, refreshChannels} from '../../../services/GlobalVarService';
import {MAIN_GREEN_MINT} from '../../../colors';

interface ChannelViewHeaderProps {
  channel: Channel;
}

const ChannelViewHeader = (props: ChannelViewHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          refreshChannels(true);
          navigation.goBack();
        }}>
        <Image
          source={HEADER_BACK_BUTTON}
          style={{tintColor: MAIN_GREEN_MINT}}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.channelInfoContainer}>
        <Text style={styles.title}> {props.channel.displayName}</Text>
        <Text style={styles.subtitle}>
          {props.channel.channelCharacter?.displayName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChannelViewHeader;

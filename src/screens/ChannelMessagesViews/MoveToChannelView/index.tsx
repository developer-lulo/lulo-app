import React from 'react';
import styles from './styles';
import {ApolloClient} from '@apollo/client';
import {channels} from '../../../services/GlobalVarService';
import ChatCard from '../../HomeView/ChatCard';
import {Alert, ScrollView, Text} from 'react-native';
import {
  Channel,
  ChannelCharacter,
  ChannelCharacterKey,
  Message,
  MoveMessageToChannelInput,
} from '../../../gql/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View} from 'react-native-animatable';
import {
  moveMessageToChannel,
  useMessagesMutations,
} from '../../../services/MessagesService';

interface MoveToChannelViewParams {
  character: ChannelCharacter;
  message: Message;
}

const MoveToChannelView = () => {
  const route = useRoute();
  const params = route.params as MoveToChannelViewParams;
  const {moveToChannel} = useMessagesMutations();

  const navigation = useNavigation();

  const chs = [...channels()];

  const handleMoveToChannel = async (channel: Channel) => {
    if (params.message.id && channel.id) {
      const input: MoveMessageToChannelInput = {
        messageId: params.message.id,
        newChannelId: channel.id,
      };

      const result = await moveToChannel(input).catch(err => {
        Alert.alert('Error', err.message);
      });

      if (result) {
        navigation.navigate('ChannelView', {
          channel,
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Selecciona uno: </Text>
      <ScrollView style={styles.scrollContainer}>
        {chs
          .filter(
            channel =>
              channel.channelCharacter?.key ===
              (params.character.key as ChannelCharacterKey),
          )
          .map(channel => (
            <ChatCard
              key={channel.id}
              chat={channel}
              onPress={() => handleMoveToChannel(channel)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default MoveToChannelView;

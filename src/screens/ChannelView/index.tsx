import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {Channel} from '../../gql/types';
import {ApolloClient, useReactiveVar} from '@apollo/client';
import ChannelViewHeader from './ChannelViewHeader';
import {useRoute} from '@react-navigation/native';
import {getChannelMessages} from '../../services/ChannelService';
import ChannelMessage from './ChannelMessage';
import MessageComposer from './MessageComposer';
import {messages} from '../../services/GlobalVarService';

interface ChannelViewProps {
  client: ApolloClient<any>;
  navigation: any;
}

interface ChannelViewParams {
  channel: Channel;
}

const ChannelView = ({client}: ChannelViewProps) => {
  const route = useRoute();
  const params = route.params as ChannelViewParams;

  const messagesReactive = useReactiveVar(messages);

  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const initComponentAsync = async () => {
      if (client) {
        const data = await getChannelMessages(client, params.channel.id).catch(
          error => {
            Alert.alert(error.message);
          },
        );

        if (data) {
          messages(data);
        }
      }
    };

    initComponentAsync();
  }, [client, params]);

  // renders
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <ChannelViewHeader channel={params.channel} />
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardShown ? 0 : 50}>
        <ScrollView style={styles.content}>
          {messagesReactive.map(message => (
            <ChannelMessage
              key={message.id}
              message={message}
              client={client}
            />
          ))}
        </ScrollView>
        <View style={styles.composer}>
          <MessageComposer client={client} channel={params.channel} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChannelView;

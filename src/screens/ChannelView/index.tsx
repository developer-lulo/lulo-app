import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {
  ChangeChannelStatusInput,
  Channel,
  ChannelStatus,
} from '../../gql/types';
import {ApolloClient, useReactiveVar} from '@apollo/client';
import ChannelViewHeader from './ChannelViewHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  changeChannelStatus,
  getChannelMessages,
} from '../../services/ChannelService';
import ChannelMessage from './ChannelMessage';
import MessageComposer from './MessageComposer';
import {messages} from '../../services/GlobalVarService';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {channels} from '../../services/GlobalVarService';

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

  const navigation = useNavigation();

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

  const handleDeleteChat = async () => {
    const input: ChangeChannelStatusInput = {
      channelId: params.channel.id,
      channelStatus: ChannelStatus.Stored,
    };

    await changeChannelStatus(client, input);

    let _channels = [...channels()];
    _channels = _channels.filter(c => c.id !== params.channel.id);
    channels([..._channels]);

    navigation.goBack();
  };

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
          {messagesReactive.length! ? (
            messagesReactive.map(message => (
              <ChannelMessage
                key={message.id}
                message={message}
                client={client}
              />
            ))
          ) : (
            <TouchableOpacity
              onPress={handleDeleteChat}
              style={styles.deleteChannelStyles}>
              <Text style={styles.deleteTextStyle}> Eliminar Chat</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <View style={styles.composer}>
          <MessageComposer client={client} channel={params.channel} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChannelView;

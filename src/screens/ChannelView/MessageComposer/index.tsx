import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SEND_MESSAGE_ICON} from '../../../constants';
import {Channel, SendMessageInput} from '../../../gql/types';
import {sendMessageOnChannel} from '../../../services/ChannelService';
import {ApolloClient} from '@apollo/client';
import {messages} from '../../../services/GlobalVarService';

interface MessageComposerProps {
  channel: Channel;
  client: ApolloClient<any>;
}

const MessageComposer = ({channel, client}: MessageComposerProps) => {
  const [text, setText] = useState<string>('');

  const onChangeText = (value: string) => {
    setText(value);
  };

  const sendMessage = async () => {
    if (text === '') {
      return;
    }

    const messageObj: SendMessageInput = {
      channelId: channel.id,
      text: text,
    };

    const newMessage = await sendMessageOnChannel(client, messageObj);
    const currentMessages = [...messages()];
    messages([...currentMessages, newMessage]);
    setText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={{
          ...styles.textInputStyle,
        }}
        onChangeText={onChangeText}
        value={text}
        placeholder="Escribe algo..."
        keyboardType="default"
      />
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={sendMessage} style={styles.action}>
          <Image source={SEND_MESSAGE_ICON} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageComposer;

import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SEND_MESSAGE_ICON} from '../../../constants';
import {Channel, SendMessageInput} from '../../../gql/types';
import {useChannelsMutations} from '../../../services/ChannelService';
import {ApolloClient} from '@apollo/client';
import {messages} from '../../../services/GlobalVarService';
import {MAIN_APP_COLOR} from '../../../colors';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';

interface MessageComposerProps {
  channel: Channel;
  client: ApolloClient<any>;
  onSendCallback?: Function;
}

const MessageComposer = ({
  channel,
  client,
  onSendCallback = () => {},
}: MessageComposerProps) => {
  const [text, setText] = useState<string>('');
  const {sendMessage} = useChannelsMutations();

  const onChangeText = (value: string) => {
    setText(value);
  };

  const _sendMessage = async () => {
    if (text === '') {
      return;
    }

    const messageObj: SendMessageInput = {
      channelId: channel.id,
      text: text,
    };

    const newMessage = await sendMessage(messageObj);
    const currentMessages = [...messages()];
    messages([...currentMessages, newMessage]);
    setText('');
    onSendCallback(messageObj);
  };

  return (
    <View style={styles.inputContainer}>
      <BottomSheetTextInput
        style={{...styles.textInputStyle}}
        onChangeText={onChangeText}
        value={text}
        placeholder="Que planeas hacer 🎉"
      />
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={_sendMessage} style={styles.action}>
          <Image
            source={SEND_MESSAGE_ICON}
            style={{tintColor: MAIN_APP_COLOR}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageComposer;

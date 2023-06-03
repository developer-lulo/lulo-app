import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Linking,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {ApolloClient} from '@apollo/client';
import {Message, UpdateMessageBasicInfo} from '../../../gql/types';
import {useRoute} from '@react-navigation/native';
import styles from './styles';
import {GOOGLE_CALENDAR_ICON, WHATSAPP_ICON} from '../../../constants';
import {TextInput} from 'react-native-gesture-handler';
import Share from 'react-native-share';
import {updateMessageBasicInfo} from '../../../services/MessagesService';
import {messages} from '../../../services/GlobalVarService';

interface MessageTaskViewProps {
  client: ApolloClient<any>;
  navigation: any;
}

interface MessageTaskViewParams {
  message: Message;
}

const taskShareActions = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: WHATSAPP_ICON,
    handler: (message: string, description: string) => {
      const _message = `*${message}*

${description}
      `;

      const shareOptions = {
        title: message,
        message: _message,
        social: Share.Social.WHATSAPP,
        failOnCancel: false,
      };

      Share.open(shareOptions).catch(console.error);
    },
  },
  {
    name: 'Google Calendar',
    id: 'google-calendar',
    icon: GOOGLE_CALENDAR_ICON,
    handler: (message: string, description: string) => {
      const _message = encodeURIComponent(message);
      const _details = encodeURIComponent(description);

      const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${_message}&details=${_details}&sf=true&output=xml`;
      Linking.openURL(link);
    },
  },
];

const MessageTaskView = ({client}: MessageTaskViewProps) => {
  const route = useRoute();
  const {message} = route.params as MessageTaskViewParams;

  console.log(message);

  const [localMessage, setLocalMessage] = useState<Message>(message);

  const [description, setDescription] = useState(
    localMessage.description || '',
  );
  const [text, setText] = useState(localMessage.text || '');

  const handleChangeTitle = (value: string) => {
    setText(value);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleSave = async () => {
    const input: UpdateMessageBasicInfo = {
      messageId: localMessage.id!,
      text,
      description,
    };
    const updatedMessage: Message | void = await updateMessageBasicInfo(
      client,
      input,
    ).catch(error => {
      Alert.alert(error.message);
    });

    if (updatedMessage) {
      const _messages = [...messages()];

      const index = _messages.findIndex(e => e.id === updatedMessage.id);
      _messages[index] = updatedMessage;

      setLocalMessage(updatedMessage);

      messages([..._messages]);
    }

    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.title}
          numberOfLines={1}
          value={text}
          onChangeText={handleChangeTitle}
          placeholder="Que planeas hacer 🎉"
        />
      </View>
      <View style={styles.detailsContainer}>
        <TextInput
          style={styles.description}
          multiline
          numberOfLines={4}
          value={description}
          placeholder="Dame todos los detalles"
          onChangeText={handleChangeDescription}
        />
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}> Guardar </Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}> Compartir en: </Text>
      <View style={styles.actionsContainer}>
        {taskShareActions.map(action => (
          <View key={action.id} style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                action.handler(text, description);
              }}>
              <Image source={action.icon} style={styles.actionIcon} />
            </TouchableOpacity>
            <Text style={styles.actionText}> {action.name} </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MessageTaskView;

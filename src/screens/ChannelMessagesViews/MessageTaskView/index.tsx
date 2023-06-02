import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {ApolloClient} from '@apollo/client';
import {Message} from '../../../gql/types';
import {useRoute} from '@react-navigation/native';
import styles from './styles';
import {GOOGLE_CALENDAR_ICON, WHATSAPP_ICON} from '../../../constants';
import {TextInput} from 'react-native-gesture-handler';

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
    handler: (message: string, description: string) => {},
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

const MessageTaskView = ({}: MessageTaskViewProps) => {
  const route = useRoute();
  const {message} = route.params as MessageTaskViewParams;

  const [description, setDescription] = useState('');
  const [text, setText] = useState(message.text || '');

  const handleChangeTitle = (value: string) => {
    setText(value);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleSave = () => {
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

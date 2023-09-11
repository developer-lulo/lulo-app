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
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './styles';
import {GOOGLE_CALENDAR_ICON, WHATSAPP_ICON} from '../../../constants';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Share from 'react-native-share';
import {updateMessageBasicInfo} from '../../../services/MessagesService';
import {characters, messages} from '../../../services/GlobalVarService';

interface MessagePinnappleViewProps {
  client: ApolloClient<any>;
  navigation: any;
}

interface MessagePinnappleViewParams {
  message: Message;
}

const commonShareActions = [
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

const MessagePinnappleView = ({client}: MessagePinnappleViewProps) => {
  const route = useRoute();
  const {message} = route.params as MessagePinnappleViewParams;

  const [localMessage, setLocalMessage] = useState<Message>(message);
  const [isSaving, setIsSaving] = useState(false);

  const navigation = useNavigation();

  const [description, setDescription] = useState(
    localMessage.description || '',
  );
  const [text, setText] = useState(localMessage.text || '');

  const charactersArray = characters();

  const handleChangeTitle = (value: string) => {
    setText(value);
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleSave = async () => {
    setIsSaving(true);
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

    setIsSaving(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.title}
            numberOfLines={2}
            multiline
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
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}> Compartir en: </Text>
        <View style={styles.actionsContainer}>
          {commonShareActions.map(action => (
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
        <Text style={styles.subtitle}> Mover a: </Text>
        <View style={styles.actionsContainer}>
          {charactersArray.map(character => (
            <View style={styles.actionContainer} key={character.id}>
              <TouchableOpacity
                style={styles.action}
                onPress={() => {
                  navigation.navigate('MoveToChannelView', {
                    character,
                    message: localMessage,
                  });
                }}>
                <Image
                  source={{uri: character.imageUrl}}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <Text style={styles.actionText}> {character.displayName} </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{minHeight: 200}} />
    </ScrollView>
  );
};

export default MessagePinnappleView;

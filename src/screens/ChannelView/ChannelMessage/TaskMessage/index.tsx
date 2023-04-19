import {
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  StyleProp,
  ImageStyle,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './styles';
import {
  ChangeMessageStatusInput,
  ChannelMessageStatus,
  Message,
} from '../../../../gql/types';

import {Dimensions} from 'react-native';

import {
  confettiPosition,
  showConfetti,
} from '../../../../services/GlobalVarService';
import {
  MAIN_BAD_RED,
  MAIN_CHECK_GREEN,
  MAIN_GRAY,
  MAIN_WHITE,
  MAIN_WHITE_ALPHA,
} from '../../../../colors';
import {ApolloClient} from '@apollo/client';
import {changeMessageStatus} from '../../../../services/MessagesService';
import Action from '../../../TestView/action';
import TaskMessageAction, {
  TaskMessageActionOnPressEvent,
  TaskMessageActionType,
} from './TaskMessageAction';

interface TaskMessageProps {
  message: Message;
  client: ApolloClient<any>;
}

const TaskMessage = ({message, client}: TaskMessageProps) => {
  const {text} = message;

  const [messageStatus, setMessageStatus] = useState<ChannelMessageStatus>(
    message.messageStatus || ChannelMessageStatus.Pending,
  );

  const getIconStyles = useCallback((): StyleProp<ImageStyle> => {
    const iconStyles: StyleProp<ImageStyle> = {
      ...styles.buttonIcon,
      position: 'absolute',
      zIndex: 1,
    };

    if (messageStatus === ChannelMessageStatus.Pending) {
      iconStyles.tintColor = MAIN_GRAY;
    } else if (messageStatus === ChannelMessageStatus.Done) {
      iconStyles.tintColor = MAIN_CHECK_GREEN;
    } else if (messageStatus === ChannelMessageStatus.Stored) {
      iconStyles.tintColor = MAIN_BAD_RED;
    }

    return iconStyles;
  }, [messageStatus]);

  const getCardStyles = useCallback((): StyleProp<ViewStyle> => {
    const cardStyles: StyleProp<ViewStyle> = {
      ...styles.card,
    };

    if (messageStatus === ChannelMessageStatus.Pending) {
      cardStyles.backgroundColor = MAIN_WHITE;
    } else if (messageStatus === ChannelMessageStatus.Done) {
      cardStyles.backgroundColor = MAIN_WHITE_ALPHA;
    } else if (messageStatus === ChannelMessageStatus.Stored) {
      cardStyles.backgroundColor = MAIN_WHITE_ALPHA;
    }

    return cardStyles;
  }, [messageStatus]);

  const getTextStyles = useCallback((): StyleProp<TextStyle> => {
    const textStyle: StyleProp<TextStyle> = {
      ...styles.text,
    };

    if (messageStatus !== ChannelMessageStatus.Pending) {
      textStyle.textDecorationLine = 'line-through';
    }

    return textStyle;
  }, [messageStatus]);

  const handleOnPress = async (event: TaskMessageActionOnPressEvent) => {
    // send mutation to update the task

    const newStatus =
      messageStatus === ChannelMessageStatus.Done
        ? ChannelMessageStatus.Pending
        : ChannelMessageStatus.Done;

    const input: ChangeMessageStatusInput = {
      messageId: message.id!,
      messageStatus: newStatus,
    };
    const updatedMessage = await changeMessageStatus(client, input);

    setMessageStatus(updatedMessage.messageStatus!);
    // set confetti config

    if (updatedMessage.messageStatus === ChannelMessageStatus.Done) {
      const {height} = Dimensions.get('window');
      const {pageX: x, pageY: y} = event;
      confettiPosition({x, y: height - y});
      showConfetti(true);
    }
  };

  return (
    <TouchableOpacity style={getCardStyles()}>
      <Text style={getTextStyles()}>{text}</Text>
      <View style={styles.button}>
        <TaskMessageAction
          onPress={handleOnPress}
          messageStatus={messageStatus}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskMessage;

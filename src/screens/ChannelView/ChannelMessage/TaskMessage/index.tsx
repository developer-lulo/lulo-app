import {Text, StyleProp, ViewStyle, TextStyle, View, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './styles';
import {
  ChangeMessageStatusInput,
  ChannelMessageStatus,
  Message,
} from '../../../../gql/types';

import {Dimensions, TouchableOpacity} from 'react-native';

import {
  confettiPosition,
  messages,
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

import TaskMessageAction, {
  TaskMessageActionOnPressEvent,
  TaskMessageActionProps,
} from './TaskMessageAction';
import {DELETE_TASK_ICON} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';

const TEXT_MAX_LENGTH = 45;

interface TaskMessageProps {
  message: Message;
  client: ApolloClient<any>;
}

const deleteButton: Pick<TaskMessageActionProps, 'colors' | 'icon'> = {
  colors: {
    animationIconColor: MAIN_BAD_RED,
    animationStrokeColor: MAIN_BAD_RED,
    iconColor: MAIN_GRAY,
  },
  icon: DELETE_TASK_ICON,
};

const checkButton: Pick<TaskMessageActionProps, 'colors'> = {
  colors: {
    animationIconColor: MAIN_GRAY,
    animationStrokeColor: MAIN_CHECK_GREEN,
    iconColor: MAIN_GRAY,
  },
};
const uncheckButton: Pick<TaskMessageActionProps, 'colors'> = {
  colors: {
    animationIconColor: MAIN_CHECK_GREEN,
    animationStrokeColor: MAIN_GRAY,
    iconColor: MAIN_CHECK_GREEN,
  },
};

const TaskMessage = ({message, client}: TaskMessageProps) => {
  const navigation = useNavigation();

  const {text} = message;

  const [messageStatus, setMessageStatus] = useState<ChannelMessageStatus>(
    message.messageStatus || ChannelMessageStatus.Pending,
  );

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

  // Check Task Methods
  // the check task start the animation and when finishing fires the mutation
  const handleCheckTask = async (event: TaskMessageActionOnPressEvent) => {
    // set confetti config
    const {height} = Dimensions.get('window');
    const {pageX: x, pageY: y} = event;
    confettiPosition({x, y: height - y});
    showConfetti(true);
  };
  const onCheckAnimationEnd = async () => {
    const input: ChangeMessageStatusInput = {
      messageId: message.id!,
      messageStatus: ChannelMessageStatus.Done,
    };
    const updatedMessage = await changeMessageStatus(client, input).catch(
      error => {
        Alert.alert(error.message);
      },
    );

    if (updatedMessage && updatedMessage.messageStatus) {
      setMessageStatus(updatedMessage.messageStatus);
    }
  };

  // Check Task Methods
  // the check task start the animation and when finishing fires the mutation
  const handleUncheckTask = async (_: TaskMessageActionOnPressEvent) => {};
  const onUncheckAnimationEnd = async () => {
    const input: ChangeMessageStatusInput = {
      messageId: message.id!,
      messageStatus: ChannelMessageStatus.Pending,
    };
    const updatedMessage = await changeMessageStatus(client, input).catch(
      error => {
        Alert.alert(error.message);
      },
    );
    if (updatedMessage && updatedMessage.messageStatus) {
      setMessageStatus(updatedMessage.messageStatus);
    }
  };

  const handleDeleteTask = async (_: TaskMessageActionOnPressEvent) => {};
  const onDeleteAnimationEnd = async () => {
    const input: ChangeMessageStatusInput = {
      messageId: message.id!,
      messageStatus: ChannelMessageStatus.Stored,
    };
    await changeMessageStatus(client, input).catch(error => {
      Alert.alert(error.message);
    });

    const currentMessages = [...messages()];
    messages(currentMessages.filter(m => m.id !== message.id));
  };

  return (
    <View style={getCardStyles()}>
      <TouchableOpacity
        style={{
          flex: 1,
          padding: 7,
        }}
        onPress={() => {
          navigation.navigate(
            'MessageTaskView' as never,
            {
              message,
            } as never,
          );
        }}>
        <Text style={getTextStyles()}>
          {text && text.length > TEXT_MAX_LENGTH
            ? text.substring(0, TEXT_MAX_LENGTH - 3) + '...'
            : text}
        </Text>
      </TouchableOpacity>
      <View style={styles.button}>
        {messageStatus === ChannelMessageStatus.Done ? (
          <TaskMessageAction
            onPress={handleDeleteTask}
            colors={deleteButton.colors}
            icon={deleteButton.icon}
            animationTime={1000}
            onAnimationEnd={onDeleteAnimationEnd}
          />
        ) : null}
        {messageStatus === ChannelMessageStatus.Done ? (
          <TaskMessageAction
            onPress={handleUncheckTask}
            colors={uncheckButton.colors}
            animationTime={1000}
            onAnimationEnd={onUncheckAnimationEnd}
          />
        ) : (
          <TaskMessageAction
            onPress={handleCheckTask}
            colors={checkButton.colors}
            animationTime={1000}
            onAnimationEnd={onCheckAnimationEnd}
          />
        )}
      </View>
    </View>
  );
};

export default TaskMessage;

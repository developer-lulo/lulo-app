import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MessageComposer from '../ChannelView/MessageComposer';
import ConfettiCannon from 'react-native-confetti-cannon';
import TaskMessage from '../ChannelView/ChannelMessage/TaskMessage';
import {ApolloClient} from '@apollo/client';
import {
  ChannelMessageStatus,
  ChannelMessageType,
  Message,
} from '../../gql/types';
import {MAIN_GREEN_MINT} from '../../colors';

import Action from './action';

interface TestViewProps {
  client: ApolloClient<any>;
}

const TestView = ({client}: TestViewProps) => {
  const message: Message = {
    id: '1512c719-bd31-4d31-bb26-83042ef13f2e',
    text: 'Asdasdasd',
    messageType: ChannelMessageType.Task,
    messageStatus: ChannelMessageStatus.Pending,
    createdAt: '2023-04-18T13:51:46.000Z',
    updatedAt: '2023-04-18T19:39:18.000Z',
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        backgroundColor: MAIN_GREEN_MINT,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
        }}>
        {/* <TaskMessage client={client} message={message} /> */}
        <Action></Action>
      </View>
    </SafeAreaView>
  );
};

export default TestView;

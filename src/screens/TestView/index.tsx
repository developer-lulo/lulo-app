import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MessageComposer from '../ChannelView/MessageComposer';
import ConfettiCannon from 'react-native-confetti-cannon';
import TaskMessage from '../ChannelView/ChannelMessage/TaskMessage';
import {ApolloClient} from '@apollo/client';

import {MAIN_GREEN_MINT} from '../../colors';
interface TestViewProps {
  client: ApolloClient<any>;
}

const TestView = ({client}: TestViewProps) => {
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
    </SafeAreaView>
  );
};

export default TestView;

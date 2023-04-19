import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Animated} from 'react-native';
import CircularProgress from '../../../../components/CircularProgress';
import {TASK_CHECK_ICON} from '../../../../constants';
import {View} from 'react-native-animatable';
import {MAIN_BAD_RED, MAIN_CHECK_GREEN, MAIN_GRAY} from '../../../../colors';
import {Message} from '../../../../gql/types';
import {ChannelMessageStatus} from '../../../../gql/types';

export interface TaskMessageActionOnPressEvent {
  pageX: number;
  pageY: number;
}

const TaskTypes = {
  [ChannelMessageStatus.Pending]: {
    icon: TASK_CHECK_ICON,
    color: MAIN_GRAY,
    animationColor: MAIN_CHECK_GREEN,
  },
  [ChannelMessageStatus.Done]: {
    icon: TASK_CHECK_ICON,
    color: MAIN_CHECK_GREEN,
    animationColor: MAIN_CHECK_GREEN,
  },
  [ChannelMessageStatus.Stored]: {
    icon: TASK_CHECK_ICON,
    color: MAIN_BAD_RED,
    animationColor: MAIN_BAD_RED,
  },
};

interface TaskMessageActionProps {
  size?: number;
  animationTime?: number;
  animationColor?: string;
  onPress: Function;
  messageStatus: ChannelMessageStatus;
}
const TaskMessageAction = ({
  size = 32,
  animationTime = 3000,
  onPress = (event: TaskMessageActionOnPressEvent) => {
    console.warn('onPress event not found', event);
  },
  messageStatus,
}: TaskMessageActionProps) => {
  const anim = useRef(new Animated.Value(0)).current;

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // bind the animated value to a number to be used as progress
  anim.addListener(v => {
    setProgress(v.value);
  });

  const startAnimation = (event: GestureResponderEvent) => {
    // execute callback from outside
    _onPress(event);

    // start showing Circular Progress
    setShowProgress(true);

    // animate the progress value
    Animated.timing(anim, {
      toValue: 100,
      duration: animationTime,
      useNativeDriver: false,
    }).start(() => {
      anim.setValue(0);
      setShowProgress(false);
    });
  };

  const _onPress = (event: GestureResponderEvent) => {
    const {pageX, pageY} = event.nativeEvent;
    onPress({pageX, pageY});
  };

  const getColors = useCallback(() => {
    if (messageStatus) {
      return showProgress
        ? TaskTypes[messageStatus].animationColor
        : TaskTypes[messageStatus].color;
    }
  }, [messageStatus, showProgress]);

  return (
    <View style={{...styles.container, height: size, width: size}}>
      <TouchableOpacity
        style={{...styles.touchable, height: size, width: size}}
        onPress={startAnimation}>
        {!showProgress ? (
          <Image
            style={{
              ...styles.icon,
              height: size / 1.7,
              width: size / 1.7,
              tintColor: getColors(),
            }}
            source={TASK_CHECK_ICON}
          />
        ) : null}
      </TouchableOpacity>
      {showProgress ? (
        <>
          <CircularProgress
            strokeProgressColor={getColors()}
            size={size}
            strokeWidth={2}
            progress={progress}
          />
          <Image
            style={{
              ...styles.icon,
              height: size / 1.7,
              width: size / 1.7,
              tintColor: getColors(),
            }}
            source={TASK_CHECK_ICON}
          />
        </>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 10,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default TaskMessageAction;

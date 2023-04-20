import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {Animated} from 'react-native';
import CircularProgress from '../../../../components/CircularProgress';
import {TASK_CHECK_ICON} from '../../../../constants';
import {View} from 'react-native-animatable';
import {MAIN_CHECK_GREEN, MAIN_GRAY} from '../../../../colors';

export interface TaskMessageActionOnPressEvent {
  pageX: number;
  pageY: number;
}

export interface TaskMessageActionProps {
  size?: number;
  animationTime?: number;
  colors?: {
    animationIconColor?: string;
    animationStrokeColor?: string;
    iconColor?: string;
    strokeColor?: string;
  };
  icon?: ImageSourcePropType;
  onPress?: Function;
  onAnimationEnd?: Function;
}
const TaskMessageAction = ({
  size = 32,
  animationTime = 3000,
  colors = {
    animationIconColor: MAIN_CHECK_GREEN,
    animationStrokeColor: MAIN_CHECK_GREEN,
    iconColor: MAIN_GRAY,
    strokeColor: MAIN_GRAY,
  },
  icon = TASK_CHECK_ICON,
  onPress = (event: TaskMessageActionOnPressEvent) => {
    console.warn('onPress handler not found', event);
  },
  onAnimationEnd = () => {
    console.warn('onAnimationEnd handler not found');
  },
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
      _onAnimationEnd();
    });
  };

  const _onPress = (event: GestureResponderEvent) => {
    const {pageX, pageY} = event.nativeEvent;
    onPress({pageX, pageY});
  };

  const _onAnimationEnd = async () => {
    onAnimationEnd();
  };

  const getIconColor = useMemo(() => {
    return showProgress ? colors.animationIconColor : colors.iconColor;
  }, [showProgress, colors.animationIconColor, colors.iconColor]);

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
              tintColor: getIconColor,
            }}
            source={icon}
          />
        ) : null}
      </TouchableOpacity>
      {showProgress ? (
        <>
          <CircularProgress
            strokeProgressColor={colors.animationStrokeColor}
            strokeColor={colors.strokeColor}
            size={size}
            strokeWidth={2}
            progress={progress}
          />
          <Image
            style={{
              ...styles.icon,
              height: size / 1.7,
              width: size / 1.7,
              tintColor: getIconColor,
            }}
            source={icon}
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

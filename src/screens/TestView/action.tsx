import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import CircularProgress from './porcentaje';
import {TASK_CHECK_ICON} from '../../constants';
import {Animated} from 'react-native';

const Action = ({size = 32}) => {
  const anim = useRef(new Animated.Value(0)).current;

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);

  anim.addListener(v => {
    setProgress(v.value);
  });

  const startAnimation = () => {
    setShowProgress(true);
    Animated.timing(anim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      anim.setValue(0);
      setShowProgress(false);
    });
  };

  return (
    <TouchableOpacity
      style={{...styles.container, height: size, width: size}}
      onPress={startAnimation}>
      {showProgress ? (
        <CircularProgress size={40} strokeWidth={3} progress={progress} />
      ) : null}
      <Image
        style={{...styles.icon, height: size / 1.7, width: size / 1.7}}
        source={TASK_CHECK_ICON}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    opacity: 1,
    // backgroundColor: 'red',
  },
  icon: {
    position: 'absolute',
    // zIndex: 1,
    opacity: 1
  },
});

export default Action;

import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import styles from './styles';
// import Lottie from 'lottie-react-native';
import {MAIN_APP_COLOR, MAIN_GREEN_MINT} from '../../colors';

interface LoaderProps {
  message?: string;
}

const Loading = (props: LoaderProps) => {
  return (
    <View style={styles.container}>
      {/* <Lottie
        source={require('./lulo-loader.lottie.json')}
        autoPlay
        loop
        speed={1.5}
      /> */}
      <ActivityIndicator size="large" color={MAIN_APP_COLOR} />
      {props.message ? (
        <Text style={styles.messageStyle}>{props.message}</Text>
      ) : null}
    </View>
  );
};

export default Loading;

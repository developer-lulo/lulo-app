import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Lottie from 'lottie-react-native';

interface LoaderProps {
  message?: string;
}

const Loading = (props: LoaderProps) => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.loader} source={LOADER_GIF} /> */}
      <Lottie
        source={require('./lulo-loader.lottie.json')}
        autoPlay
        loop
        speed={1.5}
      />
      {props.message ? (
        <Text style={styles.messageStyle}>{props.message}</Text>
      ) : null}
    </View>
  );
};

export default Loading;

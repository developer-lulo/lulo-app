import React from 'react';
import {Image, Text, View} from 'react-native';
import {LOADER_GIF} from '../../constants';
import styles from './styles';

interface LoaderProps {
  message?: string;
}

const Loading = (props: LoaderProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.loader} source={LOADER_GIF} />
      {props.message ? (
        <Text style={styles.messageStyle}>{props.message}</Text>
      ) : null}
    </View>
  );
};

export default Loading;

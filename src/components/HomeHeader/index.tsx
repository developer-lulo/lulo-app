import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lulo</Text>
      <Text style={styles.subtitle}>Yo te ayudo</Text>
    </View>
  );
};

export default HomeHeader;

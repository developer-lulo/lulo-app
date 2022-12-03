import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

export interface CharacterProps {
  name: string;
  avatar: string;
  isAvailable: boolean;
}
const Character = (props: CharacterProps) => {
  if (!props.isAvailable) {
    return (
      <View style={styles.container}>
        <View style={styles.unavailableCharacter} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: props.avatar}} style={styles.availableCharacter} />
      <Text style={styles.name}> {props.name}</Text>
    </View>
  );
};

export default Character;

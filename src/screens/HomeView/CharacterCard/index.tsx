import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ChannelCharacter} from '../../../gql/types';
import styles from './styles';

export interface CharacterCardProps {
  character: ChannelCharacter;
  onPress?: Function;
}

const CharacterCard = ({character, onPress}: CharacterCardProps) => {
  // if (!character.isAvailable) {
  if (!character) {
    return (
      <View style={styles.container}>
        <View style={styles.unavailableCharacter} />
      </View>
    );
  }

  const _onPress = () => {
    if (onPress) {
      onPress(character);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_onPress}>
      <Image
        source={{uri: character.imageUrl}}
        style={styles.availableCharacter}
      />
      <Text style={styles.name}> {character.displayName}</Text>
    </TouchableOpacity>
  );
};

export default CharacterCard;

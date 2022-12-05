import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

export interface Character {
  name: string;
  avatar: string;
  isAvailable: boolean;
}

export interface CharacterCardProps {
  character: Character;
  onPress?: Function;
}

const CharacterCard = ({character, onPress}: CharacterCardProps) => {
  if (!character.isAvailable) {
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
        source={{uri: character.avatar}}
        style={styles.availableCharacter}
      />
      <Text style={styles.name}> {character.name}</Text>
    </TouchableOpacity>
  );
};

export default CharacterCard;

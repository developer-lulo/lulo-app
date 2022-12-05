import {View, Text} from 'react-native';
import React from 'react';

export interface CharacterAction {
  icon: string;
}

export interface CharacterActionCardProps {
  action: CharacterAction;
}

const CharacterAction = (props: CharacterActionCardProps) => {
  return (
    <View>
      <Text>CharacterAction</Text>
    </View>
  );
};

export default CharacterAction;

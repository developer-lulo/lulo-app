import {View, Text} from 'react-native';
import React from 'react';

export interface Action {
  icon: string;
}

const CharacterAction = (props: Action) => {
  return (
    <View>
      <Text>CharacterAction</Text>
    </View>
  );
};

export default CharacterAction;

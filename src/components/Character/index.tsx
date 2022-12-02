import React from 'react';
import {Image, Text, View} from 'react-native';
import {MAIN_GRAY} from '../../colors';

export interface CharacterProps {
  name: string;
  avatar: string;
  isAvailable: boolean;
}
const Character = (props: CharacterProps) => {
  if (!props.isAvailable) {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 5,
          marginHorizontal: 15,
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            borderColor: MAIN_GRAY,
            borderWidth: 3,
            borderStyle: 'dashed',
            backgroundColor: '#ffffff66',
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
        marginHorizontal: 15,
      }}>
      <Image
        source={{uri: props.avatar}}
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
        }}
      />
      <Text> {props.name}</Text>
    </View>
  );
};

export default Character;

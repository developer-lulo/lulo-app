import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Action} from '../CharacterAction';

export interface Details {
  avatar: string;
  name: string;
  description: string;
  actions: Action[];
}

const CharacterDetail = (props: Details) => {
  return (
    <View style={styles.container}>
      <View style={styles.datailsContainer}></View>
    </View>
  );
};

export default CharacterDetail;

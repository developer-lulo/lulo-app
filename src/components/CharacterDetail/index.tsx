import {Image, Text, View} from 'react-native';
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
      <View style={styles.datailsContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.basicInfo}>
            <Image
              style={styles.avatar}
              source={{
                uri: props.avatar,
              }}
            />
            <Text style={styles.name}>{props.name}</Text>
          </View>
          <Text style={styles.description}>{props.description}</Text>
        </View>
        <View style={styles.actionsContainer}>
          {props.actions?.map((action, index) => {
            return <Text> Action {index} </Text>;
          })}
        </View>
      </View>
    </View>
  );
};

export default CharacterDetail;

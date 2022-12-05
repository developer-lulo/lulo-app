import {Image, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {CharacterAction} from '../CharacterActionCard';

export interface CharacterDetail {
  avatar: string;
  name: string;
  description: string;
  actions: CharacterAction[];
}
export interface CharacterDetailCardProps {
  details: CharacterDetail;
}

const CharacterDetailCard = ({details}: CharacterDetailCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.datailsContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.basicInfo}>
            <Image
              style={styles.avatar}
              source={{
                uri: details.avatar,
              }}
            />
            <Text style={styles.name}>{details.name}</Text>
          </View>
          <Text style={styles.description}>{details.description}</Text>
        </View>
        <View style={styles.actionsContainer}>
          {details.actions?.map((action, index) => {
            return <Text> Action {index} </Text>;
          })}
        </View>
      </View>
    </View>
  );
};

export default CharacterDetailCard;

import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {JUICE_IMAGE} from '../../../../constants';

const DefaultCharacterDetail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.datailsContainer}>
        <Image source={JUICE_IMAGE} />
        <Text style={styles.title}>
          Parece que aun no seleccionas un personaje
        </Text>
      </View>
    </View>
  );
};

export default DefaultCharacterDetail;

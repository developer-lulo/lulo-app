import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import styles from './styles';

const NewOrNotView = ({navigation}: any) => {
  const onPress = (button: string) => {
    navigation.navigate('Sign', {
      isNew: button === 'new',
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <HomeHeader />
      </View>

      <View style={styles.buttonsContainer}>
        {['new', 'old'].map((button: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => onPress(button)}>
            <Text>{{new: 'Soy Nuevo', old: 'Ya tengo cuenta'}[button]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NewOrNotView;

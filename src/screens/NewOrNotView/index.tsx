/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  MAIN_FONT_FAMILY,
  MAIN_FONT_FAMILY_BOLD,
  MAIN_SHADOW,
} from '../../constants';
import styles from './styles';
import HomeHeader from '../HomeView/HomeHeader';
import {MAIN_APP_COLOR, MAIN_GRAY} from '../../colors';

const NewOrNotView = ({navigation}: any) => {
  const onPress = (button: string) => {
    navigation.navigate('Sign', {
      isNewUser: button === 'new',
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
            style={{...styles.button, ...MAIN_SHADOW}}
            onPress={() => onPress(button)}>
            <Image
              source={{
                uri: 'https://icon-library.com/images/background-icon/background-icon-28.jpg',
              }}
              style={{
                ...styles.button,
                height: '100%',
                width: '100%',
                opacity: 0.175,
                position: 'absolute',
              }}
            />
            <Text
              style={{
                fontFamily: MAIN_FONT_FAMILY_BOLD,
                fontSize: 22,
                color: MAIN_GRAY,
              }}>
              {{new: 'Soy nuevo', old: 'Soy parte'}[button]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NewOrNotView;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LULO_BG, MAIN_FONT_FAMILY_BOLD, MAIN_SHADOW} from '../../constants';
import styles from './styles';
import HomeHeader from '../HomeView/HomeHeader';
import {MAIN_GRAY} from '../../colors';

const NewOrNotView = ({navigation}: any) => {
  const onPress = (button: string) => {
    navigation.navigate('Sign', {
      isNewUser: button === 'new',
    });
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={LULO_BG}>
      <View style={styles.backgroundColor}>
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
      </View>
    </ImageBackground>
  );
};

export default NewOrNotView;

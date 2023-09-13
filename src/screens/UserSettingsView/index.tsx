import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {isSignedIn} from '../../services/GlobalVarService';

import styles from './styles';
import {MAIN_BAD_RED, MAIN_GRAY} from '../../colors';
import packageJson from '../../../package.json';

const UserSettingsView = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity
          style={styles.item}
          onPress={() => {
            AsyncStorage.clear().then(_ => {
              isSignedIn(false);
            });
          }}>
          <Text style={{...styles.optionText, ...{color: MAIN_GRAY}}}>
            Cerrar sesión
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{...styles.optionText, ...{color: MAIN_BAD_RED}}}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body} />
      <View style={styles.footer}>
        <Text style={styles.nameStyle}>Felipe Mantilla</Text>
        <Text style={styles.textStyle}>felipemantillagomez@gmail.com</Text>
        <Text style={styles.textStyle}>developer@lulo.love</Text>
        <Text style={styles.textStyle}> </Text>
        <Text style={styles.textStyle}>Lulo {packageJson.version}</Text>
      </View>
    </View>
  );
};

export default UserSettingsView;

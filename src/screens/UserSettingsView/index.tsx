import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {authToken, isSignedIn} from '../../services/GlobalVarService';

import styles from './styles';

const UserSettingsView = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            authToken(undefined);
            isSignedIn(false);
          }}>
          <Text style={styles.optionText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{...styles.optionText, ...{color: 'red'}}}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserSettingsView;

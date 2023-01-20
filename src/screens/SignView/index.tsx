import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import HomeHeader from '../HomeView/HomeHeader';
import {MAIN_INPUT_STYLE} from '../../constants';
import ActionButton from './ActionButton';
import {isSignedIn} from '../../services/GlobalVarService';

const SignView = ({navigation}) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const onChangeEmail = (value: string) => {
    console.log(value);
    setEmail(value);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <HomeHeader />
      </View>
      <View style={styles.formStyle}>
        <Text style={styles.labelStyle}> Correo </Text>
        <TextInput
          style={MAIN_INPUT_STYLE}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Ingresa tu correo"
          keyboardType="email-address"
        />
        {/* <Text style={{...styles.labelStyle, marginTop: 20}}> Contraseña </Text>
        <TextInput
          style={MAIN_INPUT_STYLE}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="useless placeholder"
          keyboardType="numeric"
        /> */}
      </View>
      <View style={styles.buttonsContainer}>
        {/* <ActionButton type="back" /> */}
        <ActionButton
          type="next"
          onPress={() => {
            // navigation.navigate('Home'); // we need to re render the stack navigator, so use the reactive var isSignedIn

            isSignedIn(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignView;

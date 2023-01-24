/* eslint-disable react-native/no-inline-styles */
import {Alert, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import HomeHeader from '../../components/HomeHeader';
import {MAIN_INPUT_STYLE} from '../../constants';
import ActionButton from './ActionButton';
import {authToken, isSignedIn} from '../../services/GlobalVarService';
import {API_ENDPOINT} from '../../config';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

interface AuthResult {
  success: boolean;
  data: {
    token?: string;
    error?: string;
    rawErrorMessage?: string;
  };
}

const SignView = ({navigation, route}: any) => {
  const {isNewUser} = route.params;

  const [email, setEmail] = useState<string | undefined>('Asd@qwe.com');
  const [isAValidEmail, setIsAValidEmail] = useState(true);
  const onChangeEmail = (value: string) => {
    EMAIL_REGEX.exec(value) ? setIsAValidEmail(true) : setIsAValidEmail(false);
    setEmail(value);
  };

  const [password, setPassword] = useState<string | undefined>('1234567890');
  const [isAValidPassword, setIsAValidPassword] = useState(true);
  const onChangePassword = (value: string) => {
    if (password?.length && password.length > 7) {
      setIsAValidPassword(true);
    } else {
      setIsAValidPassword(false);
    }
    setPassword(value);
  };

  const onSubmit = async () => {
    // navigation.navigate('Home'); // we need to re render the stack navigator, so use the reactive var isSignedIn
    // isSignedIn(true);

    const requestPath = isNewUser ? 'auth/signup' : 'auth/signin';

    fetch(`${API_ENDPOINT}/${requestPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(response => response.json())
      .then((result: AuthResult) => {
        if (!result.success) {
          throw new Error(result.data.rawErrorMessage);
        }

        authToken(result.data.token);
        isSignedIn(true);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <HomeHeader />
      </View>
      <View style={styles.formStyle}>
        <Text style={styles.title}>
          {isNewUser ? 'Creemos tu cuenta' : 'Ingresemos para empezar'}
        </Text>
        {/* Email Input */}
        <Text style={styles.labelStyle}> Correo </Text>
        <TextInput
          style={MAIN_INPUT_STYLE}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Ingresa tu correo"
          keyboardType="email-address"
        />
        {!isAValidEmail && !!email ? (
          <Text style={{...styles.hint, ...styles.errorHint}}>
            Debe ser un correo válido{' '}
          </Text>
        ) : null}
        {/* Password Input */}
        <Text style={{...styles.labelStyle, marginTop: 20}}> Contraseña </Text>
        <TextInput
          style={MAIN_INPUT_STYLE}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Ingresa tu contraseña"
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
        />
        {!isAValidPassword && !!password ? (
          <Text style={{...styles.hint, ...styles.errorHint}}>
            Debe tener al menos ocho caracteres
          </Text>
        ) : null}
      </View>
      <View style={styles.buttonsContainer}>
        <ActionButton
          type="back"
          onPress={() => {
            navigation.navigate('NewOrNot');
          }}
        />
        <ActionButton
          disabled={!isAValidEmail || !isAValidPassword}
          type="next"
          onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignView;

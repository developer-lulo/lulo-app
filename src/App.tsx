import {ApolloProvider} from '@apollo/client';
import React, {Fragment, useEffect} from 'react';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Navigator from './router';
import {client} from './services/ApolloService';
import {isLoading, isSignedIn, userToken} from './services/GlobalVarService';
import SplashScreen from 'react-native-splash-screen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Confetti from './components/Confetti/Index';

const App = () => {
  useEffect(() => {
    async function init() {
      SplashScreen.hide();
      setTimeout(() => {
        isLoading(false);
      }, 1000);

      const token = await AsyncStorage.getItem('token');
      if (token) {
        isSignedIn(true);
        userToken(token);
      }
    }

    init();
  }, []);

  // renders
  return (
    <Fragment>
      <OrientationLocker orientation={PORTRAIT} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <BottomSheetModalProvider>
          <ApolloProvider client={client}>
            <Navigator client={client} />
          </ApolloProvider>
          <Confetti />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </Fragment>
  );
};

export default App;

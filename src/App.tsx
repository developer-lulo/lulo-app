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
import 'react-native-get-random-values';
import {useLocalDBSetup} from './services/SQLiteService';
import {
  localNotificationService,
  useBadgeCount,
} from './services/LocalNotificationService';

const App = () => {
  const {initLocalDb} = useLocalDBSetup();

  // badge count updated by orange messages
  useBadgeCount();

  useEffect(() => {
    async function init() {
      // initialize local db, create tables if not exist
      await initLocalDb();

      // hide splash screen
      SplashScreen.hide();

      /** -------------------------
       * Notifications Manager
       * -------------------------
       */

      // initialize local notification service, based on Notifee
      await localNotificationService.initialize();

      /** -------------------------
       * Notifications Manager End
       * -------------------------
       */

      // check if user is signed in, Currently deprecated by local db
      const token = await AsyncStorage.getItem('token');
      if (token) {
        isSignedIn(true);
        userToken(token);
      }

      // set loading to false, just to keep a bit of delay
      setTimeout(() => {
        isLoading(false);
      }, 500);
    }

    init();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

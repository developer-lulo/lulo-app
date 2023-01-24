import {ApolloProvider} from '@apollo/client';
import React, {Fragment, useEffect} from 'react';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Navigator from './router';
import {client} from './services/ApolloService';
import {isLoading} from './services/GlobalVarService';
import SplashScreen from 'react-native-splash-screen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const App = () => {
  useEffect(() => {
    async function init() {
      SplashScreen.hide();
      setTimeout(() => {
        isLoading(false);
      }, 3000);
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
            <Navigator />
          </ApolloProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </Fragment>
  );
};

export default App;

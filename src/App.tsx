import {ApolloProvider} from '@apollo/client';
import React, {Fragment, useEffect} from 'react';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Navigator from './router';
import {client} from './services/ApolloService';
import {isLoading, isSignedIn} from './services/GlobalVarService';

const App = () => {
  useEffect(() => {
    async function init() {
      setTimeout(() => {
        isLoading(false);

        // setTimeout(() => {
        //   isSignedIn(true);
        // }, 2000);
      }, 3000);
    }

    init();
  }, []);

  // renders
  return (
    <Fragment>
      <OrientationLocker orientation={PORTRAIT} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ApolloProvider client={client}>
          <Navigator />
        </ApolloProvider>
      </SafeAreaProvider>
    </Fragment>
  );
};

export default App;

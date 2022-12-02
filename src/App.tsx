import {ApolloProvider} from '@apollo/client';
import React, {Fragment} from 'react';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Navigator from './router';
import {client} from './services/ApolloService';

const App = () => {
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

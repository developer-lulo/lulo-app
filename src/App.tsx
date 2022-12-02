import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {MAIN_BLACK, MAIN_GREEN_MINT} from './colors';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? MAIN_BLACK : MAIN_GREEN_MINT,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
};

export default App;

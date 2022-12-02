import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeView from './screens/HomeView';

const RootStack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Home" component={HomeView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

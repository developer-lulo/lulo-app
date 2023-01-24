import {useReactiveVar} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Loading from './components/Loading';
import HomeView from './screens/HomeView';
import NewOrNotView from './screens/NewOrNotView';
import SignView from './screens/SignView';
import UserSettingsView from './screens/UserSettingsView';
import {isLoading, isSignedIn} from './services/GlobalVarService';

interface NavigatorProps {}

const RootStack = createNativeStackNavigator();

const Navigator = (_: NavigatorProps) => {
  const isSignedInReactive = useReactiveVar(isSignedIn);
  const isLoadingReactive = useReactiveVar(isLoading);

  return (
    <NavigationContainer>
      {isLoadingReactive ? (
        <Loading message="Esperame un tris" />
      ) : (
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
          }}>
          {isSignedInReactive ? (
            <>
              <RootStack.Screen name="Home" component={HomeView} />
              <RootStack.Screen
                name="UserSettings"
                component={UserSettingsView}
                options={{
                  presentation: 'modal',
                }}
              />
            </>
          ) : (
            <>
              <RootStack.Screen name="NewOrNot" component={NewOrNotView} />
              <RootStack.Screen
                name="Sign"
                component={SignView}
                options={{
                  presentation: 'card',
                }}
              />
            </>
          )}
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;

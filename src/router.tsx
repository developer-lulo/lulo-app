import {ApolloClient, useReactiveVar} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Loading from './components/Loading';
import ChannelView from './screens/ChannelView';
import CreateChannelView from './screens/CreateChannelView';
import HomeView from './screens/HomeView';
import NewOrNotView from './screens/NewOrNotView';
import SignView from './screens/SignView';
import UserSettingsView from './screens/UserSettingsView';
import {isLoading, isSignedIn} from './services/GlobalVarService';
import TestView from './screens/TestView';
import {TEST_MODE} from './constants';
import MessagePinnappleView from './screens/ChannelMessagesViews/MessagePinnappleView';
import MoveToChannelView from './screens/ChannelMessagesViews/MoveToChannelView';

interface NavigatorProps {
  client: ApolloClient<any>;
}

const RootStack = createNativeStackNavigator();

const Navigator = ({client}: NavigatorProps) => {
  const isSignedInReactive = useReactiveVar(isSignedIn);
  const isLoadingReactive = useReactiveVar(isLoading);

  if (TEST_MODE) {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
          }}>
          <RootStack.Screen name="Home" component={HomeView} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
    // return <TestView client={client} />;
  }

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
              <RootStack.Screen
                name="CreateChannel"
                options={{
                  presentation: 'modal',
                }}>
                {(props: any) => (
                  <CreateChannelView client={client} {...props} />
                )}
              </RootStack.Screen>

              <RootStack.Screen
                name="ChannelView"
                options={{
                  presentation: 'card',
                }}>
                {(props: any) => <ChannelView client={client} {...props} />}
              </RootStack.Screen>
              <RootStack.Screen
                name="MessagePinnappleView"
                options={{
                  presentation: 'modal',
                }}>
                {(props: any) => (
                  <MessagePinnappleView client={client} {...props} />
                )}
              </RootStack.Screen>
              <RootStack.Screen
                name="MoveToChannelView"
                options={{
                  presentation: 'modal',
                }}>
                {(props: any) => (
                  <MoveToChannelView client={client} {...props} />
                )}
              </RootStack.Screen>
            </>
          ) : (
            // Unused by the local approach, (removed by now but maybe in the future)
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

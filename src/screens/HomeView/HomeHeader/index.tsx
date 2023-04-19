import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';

import {useReactiveVar} from '@apollo/client';
import {isSignedIn} from '../../../services/GlobalVarService';
import {DEFAULT_AVATAR} from '../../../constants';

interface HomeHeaderProps {
  navigation?: any;
}

const HomeHeader = ({navigation}: HomeHeaderProps) => {
  const isSignedInReactive = useReactiveVar(isSignedIn);

  return (
    <View style={styles.container}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>Lulo</Text>
        <Text style={styles.subtitle}>Yo te ayudo</Text>
      </View>
      {isSignedInReactive ? (
        <View>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => {
              if (!navigation) {
                console.log('Error: Navigation is not defined');
              }
              navigation.navigate('UserSettings');
            }}>
            <Image source={DEFAULT_AVATAR} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default HomeHeader;

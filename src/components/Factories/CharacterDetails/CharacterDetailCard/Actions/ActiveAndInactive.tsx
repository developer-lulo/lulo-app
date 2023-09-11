import {Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './styles';
import {ChannelCharacter} from '../../../../../gql/types';
import {useNavigation} from '@react-navigation/native';

interface ActiveAndInactiveActionProps {
  character: ChannelCharacter;
}

const ActiveAndInactive = ({character}: ActiveAndInactiveActionProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.createChannelButton}>
      <Text style={styles.iconStyle}> Activar </Text>
    </TouchableOpacity>
  );
};

export default ActiveAndInactive;

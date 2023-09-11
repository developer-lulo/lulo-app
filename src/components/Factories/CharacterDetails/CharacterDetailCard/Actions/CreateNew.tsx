import {Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './styles';
import {ChannelCharacter} from '../../../../../gql/types';
import {useNavigation} from '@react-navigation/native';

interface CreateNewActionProps {
  character: ChannelCharacter;
}

const CreateNew = ({character}: CreateNewActionProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.createChannelButton}
      onPress={() => {
        navigation.navigate(
          'CreateChannel' as never,
          {
            characterId: character?.id,
            characterImage: character?.imageUrl,
          } as never,
        );
      }}>
      <Text style={styles.iconStyle}> Crear Nuevo </Text>
    </TouchableOpacity>
  );
};

export default CreateNew;

import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './styles';
import {ChannelCharacter, ChannelCharacterKey} from '../../../../../gql/types';
import {useNavigation} from '@react-navigation/native';

import {useCharactersMutations} from '../../../../../services/CharactersService';
import {channels} from '../../../../../services/GlobalVarService';
import {useReactiveVar} from '@apollo/client';

interface ActiveAndInactiveActionProps {
  character: ChannelCharacter;
}

const ActiveAndInactive = ({character}: ActiveAndInactiveActionProps) => {
  const {activateOrInactivateOrangeChannel} = useCharactersMutations();
  const $channels = useReactiveVar(channels);

  const [isOrangeActive, setIsOrangeActive] = useState(false);

  useEffect(() => {
    const orangeIndex = $channels.findIndex(
      c => c.channelCharacter?.key === ChannelCharacterKey.Orange,
    );
    orangeIndex !== -1 ? setIsOrangeActive(true) : setIsOrangeActive(false);
  }, [$channels]);

  const _onPress = async () => {
    await activateOrInactivateOrangeChannel();
  };

  return (
    <TouchableOpacity
      style={styles.createChannelButton}
      onPress={() => _onPress()}>
      <Text style={styles.iconStyle}>
        {isOrangeActive ? 'Desactivar' : 'Activar'}
      </Text>
    </TouchableOpacity>
  );
};

export default ActiveAndInactive;

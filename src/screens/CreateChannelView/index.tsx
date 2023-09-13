import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {ApolloClient} from '@apollo/client';
import {CreateChannelInput} from '../../gql/types';
import {me, refreshChannels} from '../../services/GlobalVarService';

import {
  createChannel,
  useChannelsMutations,
} from '../../services/ChannelService';
import ActionButton from '../SignView/ActionButton';
import {MAIN_INPUT_STYLE} from '../../constants';

import {useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';

interface CreateChannelViewProps {
  client: ApolloClient<any>;
  navigation: any;
}

interface RouteParams {
  characterId: string;
  characterImage: string;
}

const CreateChannelView = ({client, navigation}: CreateChannelViewProps) => {
  const meId = me()?.id;

  const route = useRoute();
  const params: RouteParams = route.params as RouteParams;

  const {createNewChannel} = useChannelsMutations();

  const onSubmit = async () => {
    const input: CreateChannelInput = {
      channelCharacterId: params.characterId,
      displayName: name,
      imageUrl: params.characterImage,
      userChannelsIds: [meId!],
    };

    const channel = await createNewChannel(input).catch(e => {
      Alert.alert('Error', e.message);
    });
    refreshChannels(true);

    navigation.goBack();
    navigation.navigate('ChannelView', {
      channel,
    });
  };

  const onChangeName = (value: string) => {
    setName(value);
  };

  const [name, setName] = useState<string>('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={50}>
      <View style={styles.formStyle}>
        <Text style={styles.labelStyle}> Nombre del chat </Text>
        <TextInput
          style={{
            ...MAIN_INPUT_STYLE,
            ...styles.customInputStyle,
          }}
          onChangeText={onChangeName}
          value={name}
          placeholder="Ingresa el nombre de tu nuevo canal"
          keyboardType="default"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ActionButton
          type="back"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ActionButton type="next" onPress={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateChannelView;

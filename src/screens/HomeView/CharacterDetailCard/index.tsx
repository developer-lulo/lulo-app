import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {ChannelCharacter} from '../../../gql/types';

export interface CharacterDetailCardProps {
  character?: ChannelCharacter;
}

const DEFAULT_VALUES = {
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRblzXG78HFcJuikHhqavZRN7FC58BKQ7WYMA&usqp=CAU',
  name: 'We Can Help',
  description: 'You may select a character to start',
};

const CharacterDetailCard = ({character}: CharacterDetailCardProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.datailsContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.basicInfo}>
            <Image
              style={styles.avatar}
              source={{
                uri: character?.imageUrl || DEFAULT_VALUES.image,
              }}
            />
            <Text style={styles.name}>
              {character?.displayName || DEFAULT_VALUES.name}
            </Text>
          </View>
          <Text style={styles.description}>
            {character?.description || DEFAULT_VALUES.description}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          {character?.id ? (
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
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CharacterDetailCard;

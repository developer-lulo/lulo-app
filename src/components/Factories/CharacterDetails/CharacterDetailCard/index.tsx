import {Image, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {ChannelCharacter, ChannelCharacterAction} from '../../../../gql/types';
import CreateNew from './Actions/CreateNew';
import ActiveAndInactive from './Actions/ActiveAndInactive';

export interface CharacterDetailCardProps {
  character?: ChannelCharacter;
}

const DEFAULT_VALUES = {
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRblzXG78HFcJuikHhqavZRN7FC58BKQ7WYMA&usqp=CAU',
  name: 'We Can Help',
  description: 'You may select a character to start',
};

const getActionComponent = (character: ChannelCharacter) => {
  if (character && character.id) {
    switch (character.action) {
      case ChannelCharacterAction.CreateNew:
        return <CreateNew character={character} />;
      case ChannelCharacterAction.ActiveNInactive:
        return <ActiveAndInactive character={character} />;
    }
  }
};

const CharacterDetailCard = ({character}: CharacterDetailCardProps) => {
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
          {getActionComponent(character!)}
        </View>
      </View>
    </View>
  );
};

export default CharacterDetailCard;

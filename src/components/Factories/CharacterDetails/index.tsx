import React from 'react';
import CharacterDetailCard from './CharacterDetailCard';
import {ChannelCharacter, ChannelCharacterKey} from '../../../gql/types';
import DefaultCharacterDetail from './default';

interface CharacterDetailsFactoryProps {
  character: ChannelCharacter | undefined | null;
}

const CharacterDetailsFactory = ({character}: CharacterDetailsFactoryProps) => {
  if (!character) {
    return <DefaultCharacterDetail />;
  }
  switch (character.key) {
    case ChannelCharacterKey.Orange:
      return <CharacterDetailCard character={character} />;
    case ChannelCharacterKey.Pinnaple:
      return <CharacterDetailCard character={character} />;
    default:
      return <DefaultCharacterDetail />;
  }
};

export default CharacterDetailsFactory;

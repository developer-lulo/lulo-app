import {gql} from '@apollo/client';

export const CHANNEL_CHARACTER_FRAGMENT = gql`
  fragment CharactersFragment on ChannelCharacter {
    id
    displayName
    imageUrl
    description
    updatedAt
    createdAt
    action
    key
  }
`;

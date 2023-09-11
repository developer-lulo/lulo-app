import {ApolloClient} from '@apollo/client';
import {Alert} from 'react-native';
import {
  CreateChannelMutationResult,
  CREATE_CHANNEL_MUTATION,
} from '../gql/mutations';
import {GetMeQueryData, ME_QUERY} from '../gql/queries';
import {ChannelCharacter, CreateChannelInput} from '../gql/types';
import {characters, me} from './GlobalVarService';
import {getContext} from './ApolloService';
import {useEffect, useState} from 'react';

export const getMeQuery = async (client: ApolloClient<any>) => {
  const result = await client.query({
    query: ME_QUERY,
    fetchPolicy: 'no-cache',
    context: getContext(),
  });

  if (result.error) {
    Alert.alert(result.error.message);
  }

  const meData: GetMeQueryData = result.data as GetMeQueryData;
  me(meData.me);

  return meData;
};

export const createChannel = async (
  client: ApolloClient<any>,
  input: CreateChannelInput,
) => {
  const result = await client.mutate({
    mutation: CREATE_CHANNEL_MUTATION,
    variables: {
      input,
    },
    context: getContext(),
  });

  if (result.errors) {
    Alert.alert(result.errors[0].message);
  }

  const channelCreated: CreateChannelMutationResult = result.data;

  return channelCreated.createChannel;
};

export const useMe = (client: ApolloClient<any>) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (client) {
        const data = await getMeQuery(client);
        me(data.me);
        characters(data.me.availableChannelCharacters as ChannelCharacter[]);

        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, [client]);

  return [isLoading];
};

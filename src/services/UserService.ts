import {ApolloClient} from '@apollo/client';
import {Alert} from 'react-native';
import {
  CreateChannelMutationResult,
  CREATE_CHANNEL_MUTATION,
} from '../gql/mutations';
import {
  GetInitialValuesQueryData,
  GetMeQueryData,
  INIT_QUERY,
  ME_QUERY,
} from '../gql/queries';
import {CreateChannelInput} from '../gql/types';
import {me} from './GlobalVarService';
import {getContext} from './ApolloService';

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

export const initValuesQuery = async (
  client: ApolloClient<any>,
  userId?: string,
) => {
  const result = await client.query({
    query: INIT_QUERY,
    context: getContext(),
    fetchPolicy: 'no-cache',
    variables: {
      userId,
    },
  });

  if (result.error) {
    Alert.alert(result.error.message);
  }

  const initData: GetInitialValuesQueryData = result.data;

  return initData;
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

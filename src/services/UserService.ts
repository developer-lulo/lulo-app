import {ApolloClient, useApolloClient, useReactiveVar} from '@apollo/client';
import {Alert} from 'react-native';
import {GetMeQueryData, ME_QUERY} from '../gql/queries';
import {ChannelCharacter} from '../gql/types';
import {characters, isUsingLocalDB, me} from './GlobalVarService';
import {getContext} from './ApolloService';
import {useCallback, useEffect, useState} from 'react';
import {useLocalDbMethods} from './SQLiteService';

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

export const useMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const $isUsingLocalDB = useReactiveVar(isUsingLocalDB);
  const {localGetMe} = useLocalDbMethods();
  const client = useApolloClient();

  const setData = (data: GetMeQueryData) => {
    me(data.me);
    characters(data.me.availableChannelCharacters as ChannelCharacter[]);
    setIsLoading(false);
  };

  const fetchDataLocal = useCallback(async () => {
    const data = await localGetMe();
    setData(data);
  }, [localGetMe]);

  const fetchDataAsync = useCallback(async () => {
    if (client) {
      const data = await getMeQuery(client);
      setData(data);
    }
  }, [client]);

  useEffect(() => {
    $isUsingLocalDB ? fetchDataLocal() : fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$isUsingLocalDB]);

  return [isLoading];
};

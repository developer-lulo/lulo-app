import {ApolloClient} from '@apollo/client';
import {getContext} from './ApolloService';
import {ChangeMessageStatusInput} from '../gql/types';
import {
  CHANGE_MESSAGE_STATUS,
  ChangeMessageStatusResult,
} from '../gql/mutations';
import {Alert} from 'react-native';

export const changeMessageStatus = async (
  client: ApolloClient<any>,
  input: ChangeMessageStatusInput,
) => {
  const result = await client.mutate({
    mutation: CHANGE_MESSAGE_STATUS,
    context: getContext(),
    variables: {
      input,
    },
  });

  if (result.errors) {
    Alert.alert(result.errors[0].message);
  }

  const message: ChangeMessageStatusResult = result.data;

  return message.changeMessageStatus;
};

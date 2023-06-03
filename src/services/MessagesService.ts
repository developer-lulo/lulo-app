import {ApolloClient} from '@apollo/client';
import {getContext} from './ApolloService';
import {
  ChangeMessageStatusInput,
  Message,
  UpdateMessageBasicInfo,
} from '../gql/types';
import {
  CHANGE_MESSAGE_STATUS,
  ChangeMessageStatusResult,
} from '../gql/mutations';
import {UPDATE_MESSAGE_BASIC_INFO} from '../gql/mutations';
import {UpdateMessageBasicInfoResult} from '../gql/mutations';

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
    console.error(result.errors);
    throw new Error(result.errors[0].message);
  }

  const message: ChangeMessageStatusResult = result.data;

  return message.changeMessageStatus;
};

export const updateMessageBasicInfo = async (
  client: ApolloClient<any>,
  input: UpdateMessageBasicInfo,
): Promise<Message> => {
  const result = await client.mutate({
    mutation: UPDATE_MESSAGE_BASIC_INFO,
    context: getContext(),
    variables: {
      input,
    },
  });

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors[0].message);
  }

  const message: UpdateMessageBasicInfoResult = result.data;

  return message.updateMessageBasicInfo;
};

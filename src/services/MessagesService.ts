import {ApolloClient, useApolloClient, useReactiveVar} from '@apollo/client';
import {getContext} from './ApolloService';
import {
  ChangeMessageStatusInput,
  Message,
  MoveMessageToChannelInput,
  UpdateMessageBasicInfo,
} from '../gql/types';
import {
  CHANGE_MESSAGE_STATUS,
  ChangeMessageStatusResult,
  MOVE_MESSAGE_TO_CHANNEL,
  MoveMessageToChannelResult,
} from '../gql/mutations';
import {UPDATE_MESSAGE_BASIC_INFO} from '../gql/mutations';
import {UpdateMessageBasicInfoResult} from '../gql/mutations';
import {useCallback, useEffect, useState} from 'react';
import {useLocalDbMethods} from './SQLiteService';
import {
  isUsingLocalDB,
  messages,
  refreshChannels,
  refreshMessages,
} from './GlobalVarService';
import {getChannelMessages} from './ChannelService';

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

export const moveMessageToChannel = async (
  client: ApolloClient<any>,
  input: MoveMessageToChannelInput,
): Promise<Message> => {
  const result = await client.mutate({
    mutation: MOVE_MESSAGE_TO_CHANNEL,
    context: getContext(),
    variables: {
      input,
    },
  });

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors[0].message);
  }

  const message: MoveMessageToChannelResult = result.data;

  return message.moveMessageToChannel;
};

export const useMessages = (channelId: string) => {
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(true);
  const {localGetMessages} = useLocalDbMethods();
  const $refresh = useReactiveVar(refreshMessages);
  const $isUsingLocalDB = useReactiveVar(isUsingLocalDB);

  const setData = (data: Message[]) => {
    messages(data);
    setIsLoading(false);
    refreshMessages(false);
  };

  const fetchDataLocal = useCallback(async () => {
    const data = await localGetMessages(channelId);
    setData(data.channelMessages);
  }, [localGetMessages, channelId]);

  const fetchDataAsync = useCallback(async () => {
    const data = await getChannelMessages(client, channelId);
    setData(data);
  }, [client, channelId]);

  useEffect(() => {
    $isUsingLocalDB ? fetchDataLocal() : fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId, $refresh]);

  return [isLoading];
};

export const useMessagesMutations = () => {
  const client = useApolloClient();
  const {
    localUpdateMessageStatus,
    localUpdateMessageBasicInfo,
    localMoveMessageToChannel,
  } = useLocalDbMethods();
  const $isUsingLocalDB = useReactiveVar(isUsingLocalDB);

  const changeStatus = useCallback(
    async (input: ChangeMessageStatusInput) => {
      const result = $isUsingLocalDB
        ? await localUpdateMessageStatus(input)
        : await changeMessageStatus(client, input);

      refreshChannels(true);

      return result;
    },
    [client, localUpdateMessageStatus, $isUsingLocalDB],
  );

  const updateBasicInfo = useCallback(
    async (input: UpdateMessageBasicInfo) => {
      const result = $isUsingLocalDB
        ? await localUpdateMessageBasicInfo(input)
        : await updateMessageBasicInfo(client, input);
      return result;
    },
    [client, localUpdateMessageBasicInfo, $isUsingLocalDB],
  );

  const moveToChannel = useCallback(
    async (input: MoveMessageToChannelInput) => {
      const result = $isUsingLocalDB
        ? await localMoveMessageToChannel(input)
        : await moveMessageToChannel(client, input);
      return result;
    },
    [$isUsingLocalDB, client, localMoveMessageToChannel],
  );

  return {
    changeStatus,
    updateBasicInfo,
    moveToChannel,
  };
};

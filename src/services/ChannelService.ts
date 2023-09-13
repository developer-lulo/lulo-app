import {ApolloClient, useApolloClient, useReactiveVar} from '@apollo/client';
import {
  ChangeChannelStatusInput,
  CreateChannelInput,
  Message,
  SendMessageInput,
} from '../gql/types';
import {
  CHANNEL_MESSAGES_QUERY,
  ChannelMessagesQueryData,
  GET_CHANNELS,
  GetChannelsQueryData,
} from '../gql/queries';
import {getContext} from './ApolloService';
import {Alert} from 'react-native';
import {
  CHANGE_CHANNEL_STATUS,
  CREATE_CHANNEL_MUTATION,
  ChangeChannelStatusResult,
  CreateChannelMutationResult,
  SEND_MESSAGE_ON_CHANNEL_MUTATION,
  SendMessageOnChannelResult,
} from '../gql/mutations';
import {useCallback, useEffect, useState} from 'react';
import {channels, isUsingLocalDB, refreshChannels} from './GlobalVarService';
import {useLocalDbMethods} from './SQLiteService';

export const getChannelMessages = async (
  client: ApolloClient<any>,
  channelId: string,
): Promise<Message[]> => {
  const result = await client.query({
    query: CHANNEL_MESSAGES_QUERY,
    fetchPolicy: 'no-cache',
    context: getContext(),
    variables: {
      channelId,
    },
  });

  if (result.error) {
    Alert.alert(result.error.message);
  }

  const messages: ChannelMessagesQueryData = result.data;

  return messages.channelMessages;
};

export const sendMessageOnChannel = async (
  client: ApolloClient<any>,
  input: SendMessageInput,
) => {
  const result = await client.mutate({
    mutation: SEND_MESSAGE_ON_CHANNEL_MUTATION,
    context: getContext(),
    variables: {
      input,
    },
  });

  if (result.errors) {
    Alert.alert(result.errors[0].message);
  }

  const message: SendMessageOnChannelResult = result.data;

  return message.sendMessageOnChannel;
};

export const changeChannelStatus = async (
  client: ApolloClient<any>,
  input: ChangeChannelStatusInput,
) => {
  const result = await client.mutate({
    mutation: CHANGE_CHANNEL_STATUS,
    context: getContext(),
    variables: {
      input,
    },
  });

  if (result.errors) {
    Alert.alert(result.errors[0].message);
  }

  const channel: ChangeChannelStatusResult = result.data;

  return channel.changeChannelStatus;
};

export const getChannels = async (
  client: ApolloClient<any>,
  userId?: string,
) => {
  const result = await client.query({
    query: GET_CHANNELS,
    context: getContext(),
    fetchPolicy: 'no-cache',
    variables: {
      userId,
    },
  });

  if (result.error) {
    Alert.alert(result.error.message);
  }

  const userChannels: GetChannelsQueryData = result.data;

  return userChannels;
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

export const useChannels = (userId: string | undefined | null) => {
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(true);
  const {localGetChannels} = useLocalDbMethods();
  const $refresh = useReactiveVar(refreshChannels);
  const $isUsingLocalDB = useReactiveVar(isUsingLocalDB);

  const setData = (data: GetChannelsQueryData) => {
    channels(data.userChannels);
    setIsLoading(false);
    refreshChannels(false);
  };

  const fetchDataLocal = useCallback(async () => {
    const data = await localGetChannels(userId);
    setData(data);
  }, [localGetChannels, userId]);

  const fetchDataAsync = useCallback(async () => {
    if (client && userId && $refresh) {
      const result = await getChannels(client, userId);
      setData(result);
    }
  }, [client, userId, $refresh]);

  useEffect(() => {
    $isUsingLocalDB ? fetchDataLocal() : fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, $refresh]);

  return [isLoading];
};

export const useChannelsMutations = () => {
  const client = useApolloClient();
  const $isUsingLocalDB = useReactiveVar(isUsingLocalDB);
  const {
    localSendMessageOnChannel,
    localChangeChannelStatus,
    localCreateChannel,
  } = useLocalDbMethods();

  const sendMessage = useCallback(
    async (input: SendMessageInput) => {
      const result = $isUsingLocalDB
        ? await localSendMessageOnChannel(input)
        : await sendMessageOnChannel(client, input);
      return result;
    },
    [$isUsingLocalDB, client, localSendMessageOnChannel],
  );

  const changeStatus = useCallback(
    async (input: ChangeChannelStatusInput) => {
      const result = $isUsingLocalDB
        ? await localChangeChannelStatus(input)
        : await changeChannelStatus(client, input);
      return result;
    },
    [$isUsingLocalDB, client, localChangeChannelStatus],
  );

  const createNewChannel = useCallback(
    async (input: CreateChannelInput) => {
      const result = $isUsingLocalDB
        ? await localCreateChannel(input)
        : await createChannel(client, input);
      return result;
    },
    [$isUsingLocalDB, client, localCreateChannel],
  );

  return {
    sendMessage,
    changeStatus,
    createNewChannel,
  };
};

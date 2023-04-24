import React, {useEffect} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {Channel} from '../../gql/types';
import {ApolloClient, useReactiveVar} from '@apollo/client';
import ChannelViewHeader from './ChannelViewHeader';
import {useRoute} from '@react-navigation/native';
import {getChannelMessages} from '../../services/ChannelService';
import ChannelMessage from './ChannelMessage';
import MessageComposer from './MessageComposer';
import {messages} from '../../services/GlobalVarService';

interface ChannelViewProps {
  client: ApolloClient<any>;
  navigation: any;
}

interface ChannelViewParams {
  channel: Channel;
}

const ChannelView = ({client}: ChannelViewProps) => {
  const route = useRoute();
  const params = route.params as ChannelViewParams;

  const messagesReactive = useReactiveVar(messages);

  useEffect(() => {
    const initComponentAsync = async () => {
      if (client) {
        const data = await getChannelMessages(client, params.channel.id).catch(
          error => {
            Alert.alert(error.message);
          },
        );

        if (data) {
          messages(data);
        }
      }
    };

    initComponentAsync();
  }, [client, params]);

  // renders
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <ChannelViewHeader channel={params.channel} />
      </View>
      <ScrollView style={styles.content}>
        {messagesReactive.map(message => (
          <ChannelMessage key={message.id} message={message} client={client} />
        ))}
      </ScrollView>
      <View style={styles.composer}>
        <MessageComposer client={client} channel={params.channel} />
      </View>
    </SafeAreaView>
  );
};

export default ChannelView;

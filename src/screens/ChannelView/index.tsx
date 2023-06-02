import React, {createRef, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  ScrollView,
  View,
  Keyboard,
  Text,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {
  ChangeChannelStatusInput,
  Channel,
  ChannelStatus,
} from '../../gql/types';
import {ApolloClient, useReactiveVar} from '@apollo/client';
import ChannelViewHeader from './ChannelViewHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  changeChannelStatus,
  getChannelMessages,
} from '../../services/ChannelService';
import ChannelMessage from './ChannelMessage';
import MessageComposer from './MessageComposer';
import {messages} from '../../services/GlobalVarService';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {channels} from '../../services/GlobalVarService';
import {MAIN_APP_COLOR, MAIN_WHITE} from '../../colors';
import BottomSheet from '@gorhom/bottom-sheet';
import {MAIN_SHADOW} from '../../constants';

enum KeyboardStates {
  isOpened = 'open',
  isClosed = 'closed',
}

interface ChannelViewProps {
  client: ApolloClient<any>;
  navigation: any;
}

interface ChannelViewParams {
  channel: Channel;
}

const contentHeightByKeyboardState = {
  [KeyboardStates.isOpened]: {
    height: '40%',
    maxHeight: '40%',
  },
  [KeyboardStates.isClosed]: {
    height: '80%',
    maxHeight: '80%',
  },
};

const ChannelView = ({client}: ChannelViewProps) => {
  const route = useRoute();
  const params = route.params as ChannelViewParams;

  const messagesReactive = useReactiveVar(messages);

  const [isLoading, setIsLoading] = useState(true);
  const [isKeyboardOpened, setIsKeyboardOpened] = useState<KeyboardStates>(
    KeyboardStates.isClosed,
  );

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setIsKeyboardOpened(KeyboardStates.isOpened);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setIsKeyboardOpened(KeyboardStates.isClosed);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const initComponentAsync = async () => {
      if (client) {
        const data = await getChannelMessages(client, params.channel.id).catch(
          error => {
            Alert.alert(error.message);
            navigation.goBack();
          },
        );
        if (data) {
          messages(data);
          setIsLoading(false);
        }
      }
    };
    initComponentAsync();
  }, [client, params, navigation]);

  const scrollViewRef = useRef();

  const handlePress = () => {
    if (scrollViewRef) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const handleDeleteChat = async () => {
    const input: ChangeChannelStatusInput = {
      channelId: params.channel.id,
      channelStatus: ChannelStatus.Stored,
    };

    await changeChannelStatus(client, input);

    let _channels = [...channels()];
    _channels = _channels.filter(c => c.id !== params.channel.id);
    channels([..._channels]);

    navigation.goBack();
  };

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['15%'], []);

  // renders
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <ChannelViewHeader channel={params.channel} />
      </View>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.content}>
            <ActivityIndicator color={MAIN_APP_COLOR} />
          </View>
        ) : (
          <ScrollView
            style={{
              ...styles.content,
              ...contentHeightByKeyboardState[isKeyboardOpened],
            }}
            ref={scrollViewRef}>
            {messagesReactive.length! ? (
              messagesReactive.map(message => (
                <ChannelMessage
                  key={message.id}
                  message={message}
                  client={client}
                />
              ))
            ) : (
              <TouchableOpacity
                onPress={handleDeleteChat}
                style={styles.deleteChannelStyles}>
                <Text style={styles.deleteTextStyle}> Eliminar Chat</Text>
              </TouchableOpacity>
            )}
            {/* Space to the last item to show it well */}
            <View style={{minHeight: 200}} />
          </ScrollView>
        )}
      </View>
      <BottomSheet
        backgroundStyle={{backgroundColor: MAIN_WHITE}}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enableHandlePanningGesture={false}
        handleComponent={() => <View style={{minHeight: 20}} />}
        style={{...MAIN_SHADOW}}>
        <View style={styles.composer}>
          <MessageComposer
            client={client}
            channel={params.channel}
            onSendCallback={() => {
              handlePress();
            }}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ChannelView;

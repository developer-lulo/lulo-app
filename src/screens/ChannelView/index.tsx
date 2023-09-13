import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {useChannelsMutations} from '../../services/ChannelService';
import ChannelMessage from './ChannelMessage';
import MessageComposer from './MessageComposer';
import {messages, refreshChannels} from '../../services/GlobalVarService';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  MAIN_APP_COLOR,
  MAIN_APP_COLOR_TINT,
  MAIN_ORANGE,
  MAIN_WHITE,
} from '../../colors';
import BottomSheet from '@gorhom/bottom-sheet';
import {LULO_BG, MAIN_SHADOW} from '../../constants';
import {ImageBackground} from 'react-native';
import {useMessages} from '../../services/MessagesService';

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

  const {changeStatus} = useChannelsMutations();
  const messagesReactive = useReactiveVar(messages);

  const [isKeyboardOpened, setIsKeyboardOpened] = useState<KeyboardStates>(
    KeyboardStates.isClosed,
  );

  const navigation = useNavigation();

  const [isLoading] = useMessages(params.channel.id);

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

    await changeStatus(input).catch(error => {
      Alert.alert(error.message);
    });

    refreshChannels(true);
    navigation.goBack();
  };

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['10%'], []);

  // renders
  return (
    <ImageBackground style={styles.backgroundImage} source={LULO_BG}>
      <View style={styles.backgroundColor}>
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
            backgroundStyle={styles.bottomSheetBackground}
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            enableHandlePanningGesture={false}
            handleComponent={() => <View style={{minHeight: 0}} />}
            style={{}}>
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
      </View>
    </ImageBackground>
  );
};

export default ChannelView;

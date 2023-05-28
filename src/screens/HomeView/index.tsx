import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import HomeHeader from './HomeHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import CharacterCard from './CharacterCard';
import {ScrollView} from 'react-native-gesture-handler';
import CharacterDetailCard from './CharacterDetailCard';
import {MAIN_SHADOW} from '../../constants';
import ChatCard from './ChatCard';
import {ChannelCharacter} from '../../gql/types';
import {ApolloClient, useReactiveVar} from '@apollo/client';
import {getMeQuery, initValuesQuery} from '../../services/UserService';
import {channels, characters} from '../../services/GlobalVarService';
import {
  MAIN_APP_COLOR,
  MAIN_APP_COLOR_TINT,
  MAIN_GREEN_MINT,
} from '../../colors';
import {ActivityIndicator} from 'react-native';

interface HomeProps {
  client: ApolloClient<any>;
  navigation: any;
}

const HomeView = ({navigation, client}: HomeProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // bottom sheet needed
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '75%'], []);

  const [openChats, setOpenChats] = useState(1);
  const [characterSelected, setCharacterSelected] = useState<
    ChannelCharacter | undefined
  >();

  // data states

  const channelsReactive = useReactiveVar(channels);
  const charactersReactive = useReactiveVar(characters);

  useEffect(() => {
    const initComponentAsync = async () => {
      if (client && channels.length) {
        const data = await getMeQuery(client);

        const initValues = await initValuesQuery(client, data.me.id);

        channels(initValues.userChannels);
        characters(initValues.channelCharacters);

        setIsLoading(false);
      }
    };

    initComponentAsync();
  }, [client, channelsReactive]);

  // renders
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <HomeHeader navigation={navigation} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {charactersReactive.map((c, index) => (
            <CharacterCard
              key={index}
              character={c}
              onPress={() => {
                openChats === 1 ? setOpenChats(0) : setOpenChats(1);
                openChats === 1
                  ? setCharacterSelected(c)
                  : setCharacterSelected(undefined);
              }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detail}>
        <CharacterDetailCard character={characterSelected} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={openChats}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: MAIN_APP_COLOR_TINT}}
        style={{...MAIN_SHADOW}}>
        {isLoading ? (
          <View
            style={{
              height: '50%',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={MAIN_APP_COLOR} size={'large'} />
          </View>
        ) : (
          <ScrollView style={{backgroundColor: MAIN_APP_COLOR_TINT}}>
            {channelsReactive.map(channel => (
              <ChatCard
                key={channel.id}
                chat={channel}
                onPress={() => {
                  navigation.navigate('ChannelView', {
                    channel,
                  });
                }}
              />
            ))}
          </ScrollView>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeView;

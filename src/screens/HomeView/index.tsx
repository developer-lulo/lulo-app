import React, {useMemo, useRef, useState} from 'react';
import {ImageBackground, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import HomeHeader from './HomeHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import CharacterCard from './CharacterCard';
import {ScrollView} from 'react-native-gesture-handler';
import {LULO_BG, MAIN_SHADOW} from '../../constants';
import ChatCard from './ChatCard';
import {ChannelCharacter} from '../../gql/types';
import {useReactiveVar} from '@apollo/client';
import {useMe} from '../../services/UserService';
import {channels, characters, me} from '../../services/GlobalVarService';
import {MAIN_APP_COLOR, MAIN_APP_COLOR_TINT} from '../../colors';
import {ActivityIndicator} from 'react-native';
import {useChannels} from '../../services/ChannelService';
import CharacterDetailsFactory from '../../components/Factories/CharacterDetails';
import {useNavigation} from '@react-navigation/native';

const HomeView = () => {
  const navigation = useNavigation();
  // // bottom sheet needed
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '75%'], []);

  /**
   * it was used to get all cloud info an save it into local db
   * */
  // const {syncToLocal} = useBulkSyncToLocalScript();
  // useEffect(() => {
  //   const asyncInit = async () => {
  //     await syncToLocal();
  //   };
  //   asyncInit();
  // });
  /**
   * end of sync
   */

  console.log('rendering HomeView');
  const [openChats, setOpenChats] = useState(1);
  const [characterSelected, setCharacterSelected] = useState<
    ChannelCharacter | undefined
  >();

  // data states

  const channelsReactive = useReactiveVar(channels);
  const charactersReactive = useReactiveVar(characters);

  const $me = useReactiveVar(me);

  const [meIsLoading] = useMe();
  const [channelsAreLoading] = useChannels($me?.id);

  // renders
  return (
    <ImageBackground style={styles.backgroundImage} source={LULO_BG}>
      <View style={styles.backgroundColor}>
        <SafeAreaView edges={['top']} style={styles.container}>
          <View style={styles.header}>
            <HomeHeader navigation={navigation} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {charactersReactive.map((c, index) => {
                return (
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
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.detail}>
            <CharacterDetailsFactory character={characterSelected} />
          </View>

          <BottomSheet
            ref={bottomSheetRef}
            index={openChats}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor: MAIN_APP_COLOR_TINT}}
            style={{...MAIN_SHADOW}}>
            {meIsLoading && channelsAreLoading ? (
              <View
                style={{
                  height: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={MAIN_APP_COLOR} />
              </View>
            ) : (
              <ScrollView style={{backgroundColor: MAIN_APP_COLOR_TINT}}>
                {channelsReactive.map(channel => (
                  <ChatCard key={channel.id} chat={channel} />
                ))}
              </ScrollView>
            )}
          </BottomSheet>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default HomeView;

import React, {Fragment, useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, Button} from 'react-native';
import BottomSheet, {useBottomSheet} from '@gorhom/bottom-sheet';
import HomeHeader from '../../components/HomeHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import CharacterCard, {Character} from '../../components/CharacterCard';
import {ScrollView} from 'react-native-gesture-handler';
import CharacterDetailCard from '../../components/CharacterDetailCard';
import {MAIN_SHADOW} from '../../constants';
import ChatCard from '../../components/ChatCard';

const CHARACTERS: Character[] = [
  {
    name: 'Shikamaru',
    avatar:
      'https://i.pinimg.com/736x/fc/9e/f7/fc9ef70e100fbc8fdf89a4a85d13315f.jpg',
    isAvailable: true,
  },
  {
    name: 'Shikamaru',
    avatar:
      'https://i.pinimg.com/736x/fc/9e/f7/fc9ef70e100fbc8fdf89a4a85d13315f.jpg',
    isAvailable: false,
  },
  {
    name: 'Shikamaru',
    avatar:
      'https://i.pinimg.com/736x/fc/9e/f7/fc9ef70e100fbc8fdf89a4a85d13315f.jpg',
    isAvailable: false,
  },
  {
    name: 'Shikamaru',
    avatar:
      'https://i.pinimg.com/736x/fc/9e/f7/fc9ef70e100fbc8fdf89a4a85d13315f.jpg',
    isAvailable: false,
  },
  {
    name: 'Shikamaru',
    avatar:
      'https://i.pinimg.com/736x/fc/9e/f7/fc9ef70e100fbc8fdf89a4a85d13315f.jpg',
    isAvailable: false,
  },
];

const HomeView = ({navigation}: any) => {
  // bottom sheet needed
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '75%'], []);

  const [openChats, setOpenChats] = useState(1);

  // renders
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <HomeHeader navigation={navigation} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CHARACTERS.map((c, index) => (
            <CharacterCard
              key={index}
              character={c}
              onPress={() => {
                openChats === 1 ? setOpenChats(0) : setOpenChats(1);
              }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detail}>
        <CharacterDetailCard
          details={{
            actions: [],
            avatar:
              'https://i.pinimg.com/736x/fc/9e/f7/fc9ef70e100fbc8fdf89a4a85d13315f.jpg',
            description:
              'Yo te puedo ayudar a recordar cosas que sean importantes para ti, incluso podré preveer algunas necesidades basadas en tus consultas',
            name: 'Shikamaru',
          }}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={openChats}
        snapPoints={snapPoints}
        style={{...MAIN_SHADOW}}>
        <ScrollView>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <ChatCard
              key={i}
              chat={{
                avatar:
                  'https://i.pinimg.com/736x/fc/9e/f7/fc9ef70e100fbc8fdf89a4a85d13315f.jpg',
                chatName: 'Pendientes',
                characterName: 'Shikamaru',
                lastUpdate: new Date(),
              }}
            />
          ))}
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeView;

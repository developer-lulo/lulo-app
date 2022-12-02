import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import HomeHeader from './HomeHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import Character, {CharacterProps} from '../../components/Character';
import {ScrollView} from 'react-native-gesture-handler';

const CHARACTERS: CharacterProps[] = [
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
];

const HomeView = () => {
  // bottom sheet needed
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <HomeHeader />

      <ScrollView horizontal={true}>
        {CHARACTERS.map(c => (
          <Character {...c} />
        ))}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeView;

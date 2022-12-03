import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_WHITE_ALPHA} from '../../colors';
import {DASHED_BORDER_WIDTH} from '../../constants';

const CHARACTER_AVATAR_SIZE = 60;

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 15,
  },
  unavailableCharacter: {
    width: CHARACTER_AVATAR_SIZE,
    height: CHARACTER_AVATAR_SIZE,
    borderRadius: 50,
    borderColor: MAIN_GRAY,
    borderWidth: DASHED_BORDER_WIDTH,
    borderStyle: 'dashed',
    backgroundColor: MAIN_WHITE_ALPHA,
  },
  availableCharacter: {
    width: CHARACTER_AVATAR_SIZE,
    height: CHARACTER_AVATAR_SIZE,
    borderRadius: 50,
  },
});

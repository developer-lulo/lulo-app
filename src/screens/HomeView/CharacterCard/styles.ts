import {StyleSheet} from 'react-native';
import {
  MAIN_APP_COLOR,
  MAIN_GRAY,
  MAIN_GREEN_MINT,
  MAIN_WHITE,
  MAIN_WHITE_ALPHA,
} from '../../../colors';
import {
  DASHED_BORDER_WIDTH,
  MAIN_FONT_FAMILY,
  MAIN_FONT_FAMILY_BOLD,
  MAIN_SHADOW,
} from '../../../constants';

const CHARACTER_AVATAR_SIZE = 60;

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 15,
    ...MAIN_SHADOW,
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
  name: {
    fontFamily: MAIN_FONT_FAMILY_BOLD,
    color: MAIN_GREEN_MINT,
  },
});

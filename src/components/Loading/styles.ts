import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_GREEN_MINT} from '../../colors';
import {MAIN_FONT_FAMILY} from '../../constants';

const LOADER_SIZE = 200;

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: MAIN_GREEN_MINT,
  },
  loader: {
    height: LOADER_SIZE,
    width: LOADER_SIZE,
  },
  messageStyle: {
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_GRAY,
    fontSize: 15,
  },
});

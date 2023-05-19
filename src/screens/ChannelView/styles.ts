import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR, MAIN_BAD_RED} from '../../colors';
import {MAIN_FONT_FAMILY, MAIN_INPUT_STYLE} from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_APP_COLOR,
    flex: 1,
  },
  header: {
    height: '10%',
    padding: 20,
    // backgroundColor: 'blue',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '70%',
    padding: 20,
  },
  composer: {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deleteChannelStyles: {
    ...MAIN_INPUT_STYLE,
  },
  deleteTextStyle: {
    color: MAIN_BAD_RED,
    textAlign: 'center',
    fontFamily: MAIN_FONT_FAMILY,
  },
});

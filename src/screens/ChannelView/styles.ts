import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR, MAIN_APP_COLOR_TINT, MAIN_BAD_RED} from '../../colors';
import {MAIN_FONT_FAMILY, MAIN_INPUT_STYLE, MAIN_SHADOW} from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_APP_COLOR,
    flex: 1,
  },
  header: {
    height: '10%',
    padding: 20,
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '90%',
    padding: 20,
  },
  contentContainer: {
    backgroundColor: MAIN_APP_COLOR_TINT,
    borderRadius: 20,
    ...MAIN_SHADOW,
  },
  loader: {
    height: '70%',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  composer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    paddingHorizontal: 20,
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

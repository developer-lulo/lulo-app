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
    padding: 20,
    height: '40%',
    maxHeight: '40%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  contentContainer: {
    backgroundColor: MAIN_APP_COLOR_TINT,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    ...MAIN_SHADOW,
    height: '100%',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 10,
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

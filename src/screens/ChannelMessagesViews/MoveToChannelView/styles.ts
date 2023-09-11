import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR_TINT} from '../../../colors';
import {MAIN_FONT_FAMILY_BOLD} from '../../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_APP_COLOR_TINT,
    padding: 10,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: MAIN_APP_COLOR_TINT,
  },
  title: {
    fontFamily: MAIN_FONT_FAMILY_BOLD,
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});

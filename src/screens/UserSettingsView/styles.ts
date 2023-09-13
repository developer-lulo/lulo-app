import {StyleSheet} from 'react-native';
import {MAIN_FONT_FAMILY, MAIN_FONT_FAMILY_BOLD} from '../../constants';
import {MAIN_APP_COLOR, MAIN_APP_COLOR_TINT} from '../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_APP_COLOR_TINT,
    flex: 1,
    display: 'flex',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 8,
  },
  footer: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    fontFamily: MAIN_FONT_FAMILY_BOLD,
  },
  textStyle: {
    fontFamily: MAIN_FONT_FAMILY,
  },
  item: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginHorizontal: 10,
    borderColor: MAIN_APP_COLOR,
    borderBottomWidth: 0.5,
  },
  optionText: {
    fontFamily: MAIN_FONT_FAMILY_BOLD,
    fontSize: 16,
  },
});

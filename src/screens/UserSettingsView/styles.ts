import {StyleSheet} from 'react-native';
import {MAIN_FONT_FAMILY_BOLD} from '../../constants';
import {MAIN_APP_COLOR, MAIN_APP_COLOR_TINT} from '../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_APP_COLOR_TINT,
    flex: 1,
  },
  header: {
    height: '10%',
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

import {StyleSheet} from 'react-native';
import {MAIN_GRAY} from '../../colors';
import {MAIN_FONT_FAMILY} from '../../constants';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: MAIN_GRAY,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_GRAY,
  },
});

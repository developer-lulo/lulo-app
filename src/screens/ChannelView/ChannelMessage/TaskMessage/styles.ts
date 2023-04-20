import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_WHITE} from '../../../../colors';
import {MAIN_FONT_FAMILY} from '../../../../constants';

export default StyleSheet.create({
  card: {
    backgroundColor: MAIN_WHITE,
    borderRadius: 50,
    padding: 10,
    margin: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  buttonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderRadius: 30,
  },
});

import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR, MAIN_GREEN_MINT, MAIN_ORANGE_TINT} from '../../colors';
import {MAIN_FONT_FAMILY} from '../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: MAIN_ORANGE_TINT,
    flexDirection: 'column',
  },
  messageStyle: {
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_APP_COLOR,
    fontSize: 15,
    position: 'absolute',
    bottom: '20%',
  },
});

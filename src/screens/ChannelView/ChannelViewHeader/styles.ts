import {StyleSheet} from 'react-native';
import {MAIN_GRAY} from '../../../colors';
import {MAIN_FONT_FAMILY} from '../../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
  },
  channelInfoContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  title: {
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: 21,
    fontWeight: 'bold',
  },
  subtitle: {
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
  },
});

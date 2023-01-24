import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_GREEN_MINT} from '../../colors';
import {MAIN_FONT_FAMILY, MAIN_SHADOW} from '../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titlesContainer: {
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
  avatarContainer: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 100,
    width: 50,
    height: 50,
    ...MAIN_SHADOW,
  },
});

import {StyleSheet} from 'react-native';
import {MAIN_GRAY} from '../../../colors';
import {MAIN_FONT_FAMILY, MAIN_FONT_FAMILY_BOLD} from '../../../constants';
const AVATAR_SIZE = 60;

export default StyleSheet.create({
  container: {
    // height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: 100,
    margin: 5,
  },
  chatInfoContainer: {
    display: 'flex',
    alignSelf: 'center',
  },
  title: {
    fontFamily: MAIN_FONT_FAMILY_BOLD,
    color: MAIN_GRAY,
    fontSize: 18,
  },
  subtitle: {
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_GRAY,
    margin: 0,
    padding: 0,
    fontSize: 12,
  },
  extededInfoContainer: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '25%',
  },
  counterBadge: {
    width: 20,
    height: 20,
    backgroundColor: '#fe3838',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBadgeText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  date: {
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_GRAY,
  },
});

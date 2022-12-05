import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_WHITE, MAIN_WHITE_ALPHA} from '../../colors';
import {DASHED_BORDER_WIDTH, MAIN_FONT_FAMILY} from '../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  datailsContainer: {
    flex: 1,
    width: '90%',
    borderWidth: DASHED_BORDER_WIDTH,
    borderStyle: 'dashed',
    borderRadius: 20,
    borderColor: MAIN_GRAY,
    backgroundColor: MAIN_WHITE_ALPHA,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: MAIN_WHITE,
  },
  name: {
    fontSize: 30,
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
  },
  basicInfo: {
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  description: {
    width: '40%',
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
  },
  actionsContainer: {},
});

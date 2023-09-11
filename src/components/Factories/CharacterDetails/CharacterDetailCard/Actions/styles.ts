import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_GREEN_MINT, MAIN_WHITE, MAIN_WHITE_ALPHA} from '../../../../../colors';
import {
  DASHED_BORDER_WIDTH,
  MAIN_FONT_FAMILY,
  MAIN_SHADOW,
} from '../../../../../constants';

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
    borderColor: MAIN_GREEN_MINT,
    backgroundColor: MAIN_WHITE_ALPHA,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    height: '60%',
    maxHeight: '60%',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: MAIN_WHITE,
  },
  name: {
    fontSize: 20,
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
    textAlign: 'center',
  },
  basicInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '40%',
  },
  description: {
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
    maxWidth: '60%',
    textAlign: 'center',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',

    height: '40%',
  },
  createChannelButton: {
    height: 60,
    minWidth: 60,
    borderRadius: 20,
    backgroundColor: MAIN_WHITE,
    ...MAIN_SHADOW,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: MAIN_GRAY,
    fontSize: 20,
  },
});

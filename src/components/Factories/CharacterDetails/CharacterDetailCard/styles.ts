import {StyleSheet} from 'react-native';
import {
  MAIN_GRAY,
  MAIN_GREEN_MINT,
  MAIN_ORANGE_TINT,
  MAIN_WHITE,
  MAIN_WHITE_ALPHA,
} from '../../../../colors';
import {
  DASHED_BORDER_WIDTH,
  MAIN_FONT_FAMILY,
  MAIN_FONT_FAMILY_BOLD,
  MAIN_SHADOW,
} from '../../../../constants';

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
    borderColor: `${MAIN_GRAY}88`,
    backgroundColor: MAIN_WHITE_ALPHA,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70%',
    maxHeight: '70%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    ...MAIN_SHADOW,
  },
  name: {
    fontSize: 40,
    color: MAIN_ORANGE_TINT,
    fontFamily: MAIN_FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
  basicInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  description: {
    color: MAIN_GRAY,
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: 16,
    textAlign: 'center',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    height: '30%',
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

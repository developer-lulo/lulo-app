import {StyleSheet} from 'react-native';
import {DASHED_BORDER_WIDTH, MAIN_FONT_FAMILY} from '../../../../constants';
import {MAIN_GREEN_MINT, MAIN_WHITE_ALPHA} from '../../../../colors';

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: 20,
    width: '70%',
    textAlign: 'center',
  },
});

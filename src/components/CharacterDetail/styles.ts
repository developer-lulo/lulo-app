import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_WHITE_ALPHA} from '../../colors';
import {DASHED_BORDER_WIDTH} from '../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  datailsContainer: {
    height: 400,
    width: '90%',
    borderWidth: DASHED_BORDER_WIDTH,
    borderStyle: 'dashed',
    borderRadius: 20,
    borderColor: MAIN_GRAY,
    backgroundColor: MAIN_WHITE_ALPHA,
  },
});

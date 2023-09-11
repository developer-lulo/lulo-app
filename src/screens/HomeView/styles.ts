import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR} from '../../colors';

export default StyleSheet.create({
  backgroundImage: {
    backgroundColor: MAIN_APP_COLOR,
    flex: 1,
  },
  backgroundColor: {
    backgroundColor: `${MAIN_APP_COLOR}aa`,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: '25%',
  },
  detail: {
    height: '50%',
  },
});

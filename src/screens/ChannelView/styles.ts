import {StyleSheet} from 'react-native';
import {MAIN_GREEN_MINT} from '../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_GREEN_MINT,
    flex: 1,
  },
  header: {
    height: '10%',
    padding: 20,
    // backgroundColor: 'blue',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '70%',
    padding: 20,
  },
  composer: {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

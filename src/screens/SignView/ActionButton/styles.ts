import {StyleSheet} from 'react-native';
import {MAIN_SHADOW} from '../../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 20,
    ...MAIN_SHADOW,
  },
});

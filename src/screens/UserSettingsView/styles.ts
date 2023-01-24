import {StyleSheet} from 'react-native';
import {MAIN_FONT_FAMILY} from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    height: '10%',
  },
  item: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    // backgroundColor: 'red',
    marginHorizontal: 10,
    borderColor: '#999999',
    borderBottomWidth: 0.5,
  },
  optionText: {
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: 16,
  },
});

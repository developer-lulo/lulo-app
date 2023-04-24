import {StyleSheet} from 'react-native';
import {MAIN_FONT_FAMILY} from '../../../constants';
import {MAIN_GRAY} from '../../../colors';

const borderRadius = 50;

export default StyleSheet.create({
  inputContainer: {
    backgroundColor: 'white',
    borderRadius,
    width: '100%',
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_GRAY,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
  textInputStyle: {
    // backgroundColor: '#00000011',
    height: '100%',
    borderRadius,
    padding: 20,
    width: '80%',
    minWidth: '70%',
  },
  actionsContainer: {
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 5,
    width: '20%',
  },
  action: {
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
    // backgroundColor: 'red',
  },
});

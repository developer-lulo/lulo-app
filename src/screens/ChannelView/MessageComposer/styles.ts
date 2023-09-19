import {StyleSheet} from 'react-native';
import {MAIN_FONT_FAMILY, MAIN_SHADOW_LOW} from '../../../constants';
import {MAIN_GRAY, MAIN_WHITE} from '../../../colors';

const borderRadius = 50;

export default StyleSheet.create({
  inputContainer: {
    backgroundColor: MAIN_WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius,
    width: '100%',
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_GRAY,
    minHeight: 40,
    maxHeight: 40,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    // backgroundColor: '#00000011',
    height: '100%',
    borderRadius,
    padding: 10,
    width: '80%',
    minWidth: '70%',
  },
  actionsContainer: {
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 0,
    // backgroundColor: 'red',
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

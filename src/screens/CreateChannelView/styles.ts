import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_WHITE} from '../../colors';
import {MAIN_FONT_FAMILY} from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_WHITE,
    flex: 1,
    padding: 20,
  },
  buttonsContainer: {
    height: '20%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  formStyle: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
  labelStyle: {
    fontFamily: MAIN_FONT_FAMILY,
    marginBottom: 10,
    fontWeight: 'bold',
    color: MAIN_GRAY,
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  customInputStyle: {
    borderColor: MAIN_GRAY,
    borderWidth: 0.3,
  },
});

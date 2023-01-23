import {StyleSheet} from 'react-native';
import {MAIN_GRAY, MAIN_GREEN_MINT} from '../../colors';
import {MAIN_FONT_FAMILY} from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_GREEN_MINT,
    flex: 1,
  },
  header: {
    height: '10%',
  },
  formStyle: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
  buttonsContainer: {
    height: '20%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelStyle: {
    fontFamily: MAIN_FONT_FAMILY,
    fontWeight: 'bold',
    color: MAIN_GRAY,
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  hint: {
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: 12,
  },
  errorHint: {
    color: 'red',
  },
  title: {
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_GRAY,
    marginBottom: 50,
    fontSize: 20,
  },
});

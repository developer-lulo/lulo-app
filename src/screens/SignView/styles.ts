import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR, MAIN_TITLES_COLOR, MAIN_BAD_RED} from '../../colors';
import {MAIN_FONT_FAMILY} from '../../constants';

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
    color: MAIN_TITLES_COLOR,
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  hint: {
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: 12,
  },
  errorHint: {
    color: MAIN_BAD_RED,
  },
  title: {
    fontFamily: MAIN_FONT_FAMILY,
    color: MAIN_TITLES_COLOR,
    marginBottom: 50,
    fontSize: 20,
  },
});

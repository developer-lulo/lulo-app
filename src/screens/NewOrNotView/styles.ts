import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR, MAIN_APP_COLOR_TINT} from '../../colors';

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
  buttonsContainer: {
    height: '80%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 200,
    width: 200,
    margin: 20,
    backgroundColor: MAIN_APP_COLOR_TINT,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

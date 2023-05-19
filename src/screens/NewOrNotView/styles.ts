import {StyleSheet} from 'react-native';
import {MAIN_APP_COLOR} from '../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_APP_COLOR,
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
    backgroundColor: 'white',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

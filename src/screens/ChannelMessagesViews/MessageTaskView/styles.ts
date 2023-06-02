import {StyleSheet} from 'react-native';
import {
  MAIN_APP_COLOR,
  MAIN_APP_COLOR_TINT,
  MAIN_WHITE,
  MAIN_WHITE_ALPHA,
} from '../../../colors';
import {
  MAIN_FONT_FAMILY,
  MAIN_FONT_FAMILY_BOLD,
  MAIN_INPUT_STYLE,
  MAIN_SHADOW_LOW,
} from '../../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: MAIN_APP_COLOR_TINT,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: MAIN_FONT_FAMILY_BOLD,
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  detailsContainer: {},
  description: {
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: 18,
    textAlign: 'justify',
    marginVertical: 20,
    flex: 1,
    maxHeight: 200,
    minWidth: '90%',
    maxWidth: '90%',
    borderRadius: 20,
    borderColor: MAIN_APP_COLOR,
    padding: 20,
    backgroundColor: MAIN_WHITE_ALPHA,
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  subtitle: {
    fontFamily: MAIN_FONT_FAMILY_BOLD,
    fontSize: 20,
    margin: 20,
  },
  action: {
    height: 100,
    width: 100,
    ...MAIN_SHADOW_LOW,
    backgroundColor: MAIN_WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  actionText: {
    fontFamily: MAIN_FONT_FAMILY,
    marginVertical: 5,
  },
  actionIcon: {
    height: 60,
    width: 60,
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  saveButton: {
    ...MAIN_INPUT_STYLE,
    marginHorizontal: 20,
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...MAIN_SHADOW_LOW,
  },
  saveButtonText: {
    fontFamily: MAIN_FONT_FAMILY,
  },
});

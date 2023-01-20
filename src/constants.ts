import {MAIN_GRAY} from './colors';

export const DASHED_BORDER_WIDTH = 3;

export const MAIN_FONT_FAMILY = 'Poppins-Regular';

export const LOADER_GIF = require('./assets/gif/loader.gif');
export const NEXT_ICON = require('./assets/images/signin-action-buttons/next.png');
export const BACK_ICON = require('./assets/images/signin-action-buttons/back.png');

export const MAIN_SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
};

export const MAIN_INPUT_STYLE = {
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 50,
  margin: 10,
  width: '100%',
  fontFamily: MAIN_FONT_FAMILY,
  color: MAIN_GRAY,
};

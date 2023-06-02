import {MAIN_GRAY} from './colors';

export const DASHED_BORDER_WIDTH = 3;

export const MAIN_FONT_FAMILY = 'Poppins-Regular';
export const MAIN_FONT_FAMILY_BOLD = 'Poppins-Bold';

// Big Buttons (forms ETC)
export const NEXT_ICON = require('./assets/images/signin-action-buttons/next.png');
export const BACK_ICON = require('./assets/images/signin-action-buttons/back.png');

export const DEFAULT_AVATAR = require('./assets/images/lulito.png');

// little Buttons (Headers)
export const HEADER_BACK_BUTTON = require('./assets/images/header-action-buttons/back.png');
export const SEND_MESSAGE_ICON = require('./assets/images/channel-buttons/send.png');
export const TASK_CHECK_ICON = require('./assets/images/channel-buttons/task-check.png');
export const DELETE_TASK_ICON = require('./assets/images/channel-buttons/delete-task.png');

// action tasks buttons

export const WHATSAPP_ICON = require('./assets/images/messages/tasks/whatsapp.png');
export const GOOGLE_CALENDAR_ICON = require('./assets/images/messages/tasks/google-calendar.png');

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

export const MAIN_SHADOW_LOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2,
};

export const MAIN_INPUT_STYLE = {
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 50,
  width: '100%',
  fontFamily: MAIN_FONT_FAMILY,
  color: MAIN_GRAY,
};

export const TEST_MODE = false;

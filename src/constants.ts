import {MAIN_GRAY} from './colors';
import {ChannelCharacterAction, ChannelCharacterKey} from './gql/types';
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

export const WHATSAPP_ICON = require('./assets/images/messages/pinnapple/whatsapp.png');
export const GOOGLE_CALENDAR_ICON = require('./assets/images/messages/pinnapple/google-calendar.png');
export const ORANGE_ICON = require('./assets/images/messages/pinnapple/naranja.png');

export const JUICE_IMAGE = require('./assets/images/system/juice.png');
export const LULO_BG = require('./assets/images/system/lulo-bg.png');

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

export const CHARACTERS = [
  // Keep it always as the first one
  {
    action: ChannelCharacterAction.ActiveNInactive,
    description:
      '¡Hola! ¡Soy Naranja! yo te ayudaré a gestionar tus tareas diarias. Cada recordatorio es un pequeño gesto de cariño, cada tarea, una oportunidad de crecimiento!',
    display_name: 'Naranja',
    id: '2e141826-04e7-46e6-a078-1ef33512f842',
    image_url:
      'https://storage.googleapis.com/lulo-380819.appspot.com/public/aa82df60-1e23-442a-8f19-7fa4c900eb54-naranja.png',
    key: ChannelCharacterKey.Orange,
  },
  {
    action: ChannelCharacterAction.CreateNew,
    description:
      '¡Hola! ¡Soy Piñita! Estoy aquí para ayudarte con la creación y gestión de tus tareas y proyectos personales. Juntos, podemos organizar listas de tareas  ¡Juntos, podemos hacer grandes cosas! ¡Cuenta conmigo!',
    display_name: 'Piñita',
    id: '14d0e85d-4374-4932-80a8-b72b9390fb3d',
    image_url:
      'https://storage.googleapis.com/lulo-380819.appspot.com/public/25333842-e447-452d-9627-20d915ccb4c5-pina.png',
    key: ChannelCharacterKey.Pinnaple,
  },
];

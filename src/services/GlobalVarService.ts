import {makeVar} from '@apollo/client';

import {Channel, ChannelCharacter, Message, User} from '../gql/types';

export const isSignedIn = makeVar<boolean>(true);
export const isUsingLocalDB = makeVar<boolean>(false);

// loading screen
export const isLoading = makeVar<boolean>(true);
export const loaderMessage = makeVar<string | null | undefined>(null);

// user props
export const userToken = makeVar<string | null | undefined>(null);
export const me = makeVar<User | undefined>(undefined);

// app props
export const channels = makeVar<Channel[]>([]);
export const refreshChannels = makeVar<boolean>(true);
export const characters = makeVar<ChannelCharacter[]>([]);
export const refreshCharacters = makeVar<boolean>(true);
export const messages = makeVar<Message[]>([]);
export const refreshMessages = makeVar<boolean>(true);

// functionalities

export const showConfetti = makeVar<Boolean>(false);
export interface ConfettiPositionInput {
  x: number;
  y: number;
}
export const confettiPosition = makeVar<ConfettiPositionInput>({x: 0, y: 0});

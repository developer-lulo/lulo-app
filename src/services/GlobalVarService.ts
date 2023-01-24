import {makeVar} from '@apollo/client';

export const isSignedIn = makeVar<boolean>(false);

// loading screen
export const isLoading = makeVar<boolean>(true);
export const loaderMessage = makeVar<string | null | undefined>(null);

// user props
export const authToken = makeVar<string | undefined>(undefined);

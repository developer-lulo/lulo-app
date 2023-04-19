import {ApolloClient, InMemoryCache} from '@apollo/client';
import {apolloCommonSettings} from '../config';
import {userToken} from './GlobalVarService';

export interface ApolloSettings {
  // ws: string;
  http: string;
}

// Initialize Apollo Client
console.log(apolloCommonSettings().http);
export const client = new ApolloClient({
  uri: apolloCommonSettings().http,
  cache: new InMemoryCache(),
});

// to auth each request
export const getContext = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + userToken(),
    },
  };
};

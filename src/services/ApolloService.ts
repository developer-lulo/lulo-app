import {ApolloClient, InMemoryCache} from '@apollo/client';
import {apolloCommonSettings} from '../config';

export interface ApolloSettings {
  // ws: string;
  http: string;
}

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: apolloCommonSettings().http,
  cache: new InMemoryCache(),
});

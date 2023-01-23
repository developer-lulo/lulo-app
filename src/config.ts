import {ApolloSettings} from './services/ApolloService';

export const API_ENDPOINT = 'http://localhost:9000';

const LOCAL_SETTINGS: ApolloSettings = {
  //   ws: 'wss://api.betql.co/graphql',
  http: `${API_ENDPOINT}/graphql`,
};

// const PROD_SETTINGS: ApolloSettings = {
//   ws: 'wss://api.betql.co/graphql',
//   http: 'https://api.betql.co/graphql',
// };

export const apolloCommonSettings = (): ApolloSettings => {
  return LOCAL_SETTINGS;
};

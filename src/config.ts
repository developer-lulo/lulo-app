import {ApolloSettings} from './services/ApolloService';

const LOCAL_SETTINGS: ApolloSettings = {
  //   ws: 'wss://api.betql.co/graphql',
  http: 'localhost:4000/graphql',
};

// const PROD_SETTINGS: ApolloSettings = {
//   ws: 'wss://api.betql.co/graphql',
//   http: 'https://api.betql.co/graphql',
// };

export const apolloCommonSettings = (): ApolloSettings => {
  return LOCAL_SETTINGS;
};

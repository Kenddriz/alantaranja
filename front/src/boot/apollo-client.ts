import { boot } from 'quasar/wrappers';
import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache, split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import {DefaultApolloClient} from '@vue/apollo-composable';
import {createUploadLink} from 'apollo-upload-client';
import customFetch from 'src/utils/upload';
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";

const authLink = setContext((_, { headers, ...context }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('token') as string}`,
    },
    ...context,
  };
});

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  },
};

const httpOptions: any = {
  uri: process.env.api + 'graphql',
  fetch: typeof window === 'undefined' ? global.fetch : customFetch,
};

const httpLink = new HttpLink(httpOptions);
// Create the subscription websocket link
const wbsLink = new WebSocketLink({
  uri: httpOptions.uri.replace('http', 'ws'),
  options: {
    reconnect: true,
  },
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const wsLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wbsLink,
)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let error = '';
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      return (error = String(message));
    });

  if (error.toLowerCase() === 'unauthorized') {
    localStorage.clear();
    sessionStorage.clear();
    if(window.location.pathname != '/') window.location.href = '/auth/login';
  }
});

const uploadLink = ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  createUploadLink(httpOptions) as any,
);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(uploadLink).concat(wsLink).concat(httpLink),
  cache: new InMemoryCache({ addTypename: true }), // Cache implementation
  connectToDevTools: true,
  defaultOptions,
});

export default boot(({ app }) => {
  app.provide(DefaultApolloClient, apolloClient);
});

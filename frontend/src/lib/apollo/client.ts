/**
 * WHAT: Apollo Client configuration
 * WHY: GraphQL client with authentication support
 * HOW: Adds JWT token to all requests via authLink
 */

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const TOKEN_KEY = 'keep_reading_token';

// HTTP connection to the GraphQL API
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Middleware to add auth token to headers
const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  const token = localStorage.getItem(TOKEN_KEY);

  // Return headers with authorization
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Combine authLink and httpLink
export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
